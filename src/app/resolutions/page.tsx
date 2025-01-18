"use client";

import { cn } from "@/lib/utils";
import { queries } from "@/lib/database";
import { useQuery } from "@tanstack/react-query";

export default function Resolutions() {
  const { data: resolutions, isLoading } = useQuery(queries.resolutions);

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  console.log(resolutions);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
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
              {resolutions?.goals.map((goal, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{goal.goal}</h2>
                  <ul className="list-inside list-disc space-y-2">
                    {goal.steps.map((step) => (
                      <li key={step.step} className="text-muted-foreground">
                        {step.step}
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
