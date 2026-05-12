import type { ReactNode } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />
      <main className="mx-auto w-full max-w-8xl px-6 pb-8 pt-25">
        {children}
      </main>
      <Footer />
    </div>
  );
}
