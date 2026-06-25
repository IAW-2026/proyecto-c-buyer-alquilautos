import { Suspense } from "react";
import DashboardClient from "@/app/dashboard/dashboard-client";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-25">
          <div className="flex w-full flex-col gap-8">
            <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
              <div className="h-72 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)]" />
              <div className="h-72 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)]" />
            </section>
          </div>
        </main>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
