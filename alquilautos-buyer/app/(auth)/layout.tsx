import type { ReactNode } from "react";

export default function SignInLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style>{`
        footer {
          display: none;
        }
      `}</style>
      {children}
    </>
  );
}
