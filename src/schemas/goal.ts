import { z } from "zod";

export const goalSchema = z.object({
  goal: z.string().describe("A goal to achieve"),
  steps: z
    .array(
      z.object({
        step: z.string().describe("A step to achieve the goal"),
        isCompleted: z.boolean().describe("Whether the step is completed"),
      })
    )
    .min(1)
    .describe("An array of steps to achieve the goal"),
});

export type Step = {
  step: string;
  isCompleted: boolean;
};

export type Goal = {
  goal: string;
  steps: Step[];
};

export type Resolutions = {
  goals: Goal[];
};

export const resolutionsSchema = z.object({
  goals: z.array(goalSchema).min(1).describe("An array of goals with steps"),
});
