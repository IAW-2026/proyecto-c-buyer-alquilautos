"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const isAdmin = user?.publicMetadata?.role === "adminBuyer";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard" || pathname.startsWith("/dashboard/")
      : pathname === href || pathname.startsWith(href + "/");

  const linkClass = (href: string) =>
    `relative text-sm font-medium transition-colors duration-150 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-all after:duration-150 ${
      isActive(href)
        ? "text-white after:bg-white"
        : "text-[var(--color-neutral-300)] after:bg-transparent hover:text-white"
    }`;

  const navLinks = [
    { href: "/dashboard", label: "Explorar" },
    { href: "/reservas", label: "Mis reservas" },
    { href: "/perfil", label: "Mi perfil" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 bg-[var(--navbar-bg)] shadow-[var(--shadow-md)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Alquilautos" width={34} height={34} priority loading="eager" style={{ width: "34px", height: "34px" }} />
            <span className="text-base font-bold tracking-tight text-white">
              AlquilAutos
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            <Link
              href="/favoritos"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 ${
                isActive("/favoritos") ? "text-white" : "text-[var(--color-neutral-300)] hover:text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-star)]" fill="currentColor">
                <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
              </svg>
              Favoritos
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex h-8 items-center justify-center rounded-full bg-[var(--color-primary-400)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--color-primary-300)]"
              >
                Admin panel
              </Link>
            )}
          </nav>

          {/* Desktop derecha */}
          <div className="hidden items-center gap-3 md:flex">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex h-8 items-center justify-center rounded-full border border-white/20 px-4 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Ingresar
              </Link>
            )}
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label={theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro"}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="M4.93 19.07l1.41-1.41" /><path d="M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile derecha: user + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            {isSignedIn && <UserButton />}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Abrir menú"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Panel lateral derecho */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[var(--navbar-bg)] shadow-[var(--shadow-lg)] transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del panel */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="text-base font-bold text-white">Menú</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-white/10 text-white"
                  : "text-[var(--color-neutral-300)] hover:bg-white/5 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/favoritos"
            className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors ${
              isActive("/favoritos")
                ? "bg-white/10 text-white"
                : "text-[var(--color-neutral-300)] hover:bg-white/5 hover:text-white"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-star)]" fill="currentColor">
              <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
            </svg>
            Favoritos
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`flex h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "bg-[var(--color-primary-400)] text-white"
                  : "text-[var(--color-primary-300)] hover:bg-white/5"
              }`}
            >
              Admin panel
            </Link>
          )}
        </nav>

        {/* Footer del panel */}
        <div className="mt-auto border-t border-white/10 px-6 py-5 flex items-center justify-between">
          {!isSignedIn && (
            <Link
              href="/sign-in"
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 px-4 text-xs font-semibold text-white hover:bg-white/10"
            >
              Ingresar
            </Link>
          )}
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            aria-label={theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" /><path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" /><path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" /><path d="M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}