import type { ReactNode } from "react";

type FavoritosLayoutProps = {
  children: ReactNode;
};

export default function FavoritosLayout({ children }: FavoritosLayoutProps) {
  return <>{children}</>;
}
