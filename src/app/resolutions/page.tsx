"use client";

import { cn } from "@/lib/utils";

export default function Resolutions() {
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

            <div className="flex flex-col gap-6">{/* List items */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
