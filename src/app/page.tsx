"use client";

import { LoaderCircleIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/database";
import { Resolutions } from "@/schemas/goal";

interface GoalEntry {
  id: string;
  value: string;
}

const defaultGoals: GoalEntry[] = [
  {
    id: globalThis.crypto.randomUUID(),
    value: "",
  },
];

export default function Home() {
  const router = useRouter();
  const [goals, setGoals] = useState<GoalEntry[]>(defaultGoals);

  const addGoal = () =>
    setGoals((prev) => [
      ...prev,
      {
        id: globalThis.crypto.randomUUID(),
        value: "",
      },
    ]);

  const removeGoal = (id: string) =>
    setGoals((prev) => prev.filter((goal) => goal.id !== id));

  const createInputHandler = (id: string) => (value: string) =>
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, value } : goal))
    );

  const mutation = useMutation({
    mutationFn: async (goals: GoalEntry[]) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          goals: goals.map((goal) => goal.value),
        }),
      });

      return response.json() as Promise<{ data: Resolutions }>;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(goals, {
      onSuccess: async (data) => {
        try {
          await db.setResolutions(data.data);
          router.push("/resolutions");
        } catch (error) {
          console.error("Failed to save resolutions:", error);
          alert("Failed to save your resolutions. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        alert("An error occurred. Please try again.");
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-5xl font-extrabold tracking-tight">
                  Year Compass
                </h1>
                <div className="text-center text-muted-foreground">
                  Navigate your new year resolutions with structured planning.
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  {goals.map((goal, index, arr) => {
                    const isLast = index === arr.length - 1;

                    return (
                      <div
                        key={goal.id}
                        className="flex w-full max-w-sm items-center space-x-2"
                      >
                        <Input
                          placeholder={`Goal #${index + 1}`}
                          name={`goal-${index}`}
                          value={goal.value}
                          onChange={(e) =>
                            createInputHandler(goal.id)(e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key !== "Enter") return;
                            e.preventDefault();

                            if (isLast) addGoal();
                          }}
                        />

                        {isLast ? (
                          <Button
                            type="button"
                            onClick={addGoal}
                            size="icon"
                            className="aspect-square"
                          >
                            <PlusIcon />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => removeGoal(goal.id)}
                            size="icon"
                            className="aspect-square"
                            variant="destructive"
                          >
                            <TrashIcon />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Button disabled={mutation.isPending} className="w-full">
                  {mutation.isPending ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    "Plan!"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
