"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { db, queries } from "@/lib/database";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function Resolutions() {
  const queryClient = useQueryClient();
  const { data: resolutions, isLoading } = useQuery(queries.resolutions);

  const showMilestoneMessage = (progress: number) => {
    if (progress === 100) {
      toast.success("Incredible! You've completed all steps! 🎉");
    } else if (progress >= 75) {
      toast.success("Almost there! You're doing amazing! 🌟");
    } else if (progress >= 50) {
      toast.success("Halfway through! Keep up the great work! 💪");
    } else if (progress >= 25) {
      toast.success("Great start! You're making progress! 🌱");
    }
  };

  const updateStepMutation = useMutation({
    mutationFn: async ({
      goalIndex,
      stepIndex,
      isCompleted,
    }: {
      goalIndex: number;
      stepIndex: number;
      isCompleted: boolean;
    }) => {
      await db.updateStep(goalIndex, stepIndex, isCompleted);
    },
    onSuccess: (_, { goalIndex }) => {
      queryClient.invalidateQueries({ queryKey: queries.resolutions.queryKey });

      if (resolutions?.goals[goalIndex]) {
        const progress = calculateProgress(resolutions.goals[goalIndex].steps);
        showMilestoneMessage(progress);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const calculateProgress = (steps: { isCompleted: boolean }[]) => {
    if (steps.length === 0) return 0;
    const completed = steps.filter((step) => step.isCompleted).length;
    return (completed / steps.length) * 100;
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
        <div className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl">
                To help you achieve your resolution, we&apos;ve broken it down
                into smaller, more manageable steps:
              </h1>
              <div className="w-full text-left text-muted-foreground">
                Let&apos;s start!
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {resolutions?.goals.map((goal, goalIndex) => (
                <div key={goalIndex} className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{goal.goal}</h2>
                  <Progress
                    value={calculateProgress(goal.steps)}
                    className="mb-2"
                  />
                  <ul className="space-y-2">
                    {goal.steps.map((step, stepIndex) => (
                      <li key={step.step} className="flex items-center gap-2">
                        <Checkbox
                          checked={step.isCompleted}
                          onCheckedChange={(checked) => {
                            updateStepMutation.mutate({
                              goalIndex,
                              stepIndex,
                              isCompleted: checked === true,
                            });
                          }}
                        />
                        <span className="text-muted-foreground">
                          {step.step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
