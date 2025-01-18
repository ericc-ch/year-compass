import localforage from "localforage";

// Types for our data model
export type Step = {
  text: string;
  isCompleted: boolean;
};

// Initialize localforage
localforage.config({
  name: "year-compass",
  storeName: "resolutions",
});

// Type-safe database keys
const keys = {
  currentResolution: "currentResolution",
  resolutionSteps: "resolutionSteps",
  reminderNote: "reminderNote",
} as const;

// Type-safe database operations
export const db = {
  // Get current resolution
  getCurrentResolution: async () => {
    try {
      return await localforage.getItem<string>(keys.currentResolution);
    } catch (error) {
      console.error("Failed to get current resolution:", error);
      throw error;
    }
  },

  // Set current resolution
  setCurrentResolution: async (resolution: string) => {
    try {
      await localforage.setItem(keys.currentResolution, resolution);
    } catch (error) {
      console.error("Failed to set current resolution:", error);
      throw error;
    }
  },

  // Get all steps
  getSteps: async () => {
    try {
      const steps = await localforage.getItem<Step[]>(keys.resolutionSteps);
      return steps || [];
    } catch (error) {
      console.error("Failed to get steps:", error);
      throw error;
    }
  },

  // Set all steps
  setSteps: async (steps: Step[]) => {
    try {
      await localforage.setItem(keys.resolutionSteps, steps);
    } catch (error) {
      console.error("Failed to set steps:", error);
      throw error;
    }
  },

  // Update a single step
  updateStep: async (index: number, isCompleted: boolean) => {
    try {
      const steps = await db.getSteps();
      if (!steps[index]) {
        throw new Error("Step not found");
      }
      steps[index].isCompleted = isCompleted;
      await db.setSteps(steps);
    } catch (error) {
      console.error("Failed to update step:", error);
      throw error;
    }
  },

  // Get reminder note
  getReminderNote: async () => {
    try {
      return await localforage.getItem<string>(keys.reminderNote);
    } catch (error) {
      console.error("Failed to get reminder note:", error);
      throw error;
    }
  },

  // Set reminder note
  setReminderNote: async (note: string) => {
    try {
      await localforage.setItem(keys.reminderNote, note);
    } catch (error) {
      console.error("Failed to set reminder note:", error);
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
