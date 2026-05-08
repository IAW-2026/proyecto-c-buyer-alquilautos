import type { ReactNode } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
