import localforage from "localforage";
import { Resolutions } from "../schemas/goal";

// Initialize localforage
localforage.config({
  name: "year-compass",
  storeName: "resolutions",
});

// Type-safe database keys
const keys = {
  resolutions: "resolutions",
  reminderNote: "reminderNote",
} as const;

// Type-safe database operations
export const db = {
  // Get all resolutions
  getResolutions: async (): Promise<Resolutions | null> => {
    try {
      return await localforage.getItem<Resolutions>(keys.resolutions);
    } catch (error) {
      console.error("Failed to get resolutions:", error);
      throw error;
    }
  },

  // Set all resolutions
  setResolutions: async (resolutions: Resolutions) => {
    try {
      await localforage.setItem(keys.resolutions, resolutions);
    } catch (error) {
      console.error("Failed to set resolutions:", error);
      throw error;
    }
  },

  // Update a single step in a goal
  updateStep: async (
    goalIndex: number,
    stepIndex: number,
    isCompleted: boolean
  ) => {
    try {
      const resolutions = await db.getResolutions();
      if (!resolutions?.goals[goalIndex]) {
        throw new Error("Goal not found");
      }
      if (!resolutions.goals[goalIndex].steps[stepIndex]) {
        throw new Error("Step not found");
      }
      resolutions.goals[goalIndex].steps[stepIndex].isCompleted = isCompleted;
      await db.setResolutions(resolutions);
    } catch (error) {
      console.error("Failed to update step:", error);
      throw error;
    }
  },

  // Clear all data
  clear: async () => {
    try {
      await localforage.clear();
    } catch (error) {
      console.error("Failed to clear database:", error);
      throw error;
    }
  },
};
