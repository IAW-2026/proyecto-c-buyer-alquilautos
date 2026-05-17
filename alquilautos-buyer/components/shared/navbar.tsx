"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const { isSignedIn } = useUser();
	const buildSignInHref = (redirectTo: string) =>
		`/sign-in?redirect_url=${encodeURIComponent(redirectTo)}`;

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<header className="absolute inset-x-0 top-0 z-30 bg-[var(--navbar-bg)]">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-3">
					<Image
						src="/logo.webp"
						alt="Alquilautos"
						width={36}
						height={36}
						priority
					/>
					<span className="text-lg font-semibold text-[var(--navbar-text)]">
						Alquilautos
					</span>
				</div>
				<div className="flex items-center gap-6 text-sm text-[var(--navbar-text)]">
					<nav className="flex items-center gap-6">
						<Link
							href="/dashboard"
							className="font-semibold text-[var(--navbar-text)]"
						>
							Explorar
						</Link>
						{isSignedIn ? (
							<>
								<Link href="/reservas">Mis reservas</Link>
								<Link href="/perfil">Mi perfil</Link>
								<Link
									href="/favoritos"
									className="flex items-center gap-2 font-semibold"
								>
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										className="h-4 w-4 text-[#f2c94c]"
										fill="currentColor"
									>
										<path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
									</svg>
									<span>Favoritos</span>
								</Link>
							</>
						) : (
							<>
								<Link
									href={buildSignInHref("/reservas")}
									className="text-[var(--navbar-text)]"
								>
									Mis reservas
								</Link>
								<Link
									href={buildSignInHref("/perfil")}
									className="text-[var(--navbar-text)]"
								>
									Mi perfil
								</Link>
								<Link
									href={buildSignInHref("/dashboard/favoritos")}
									className="flex items-center gap-2 font-semibold text-[var(--navbar-text)]"
								>
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										className="h-4 w-4 text-[#f2c94c]"
										fill="currentColor"
									>
										<path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
									</svg>
									<span>Favoritos</span>
								</Link>
							</>
						)}
					</nav>
					<div className="flex items-center gap-3">
						{!isSignedIn ? (
							<Link
								href={buildSignInHref("/dashboard")}
								className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--border-default)] px-4 text-xs font-semibold"
							>
								Ingresar
							</Link>
						) : (
							<UserButton />
						)}
					</div>
					<button
						type="button"
						onClick={() =>
							setTheme((prev) => (prev === "dark" ? "light" : "dark"))
						}
						className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
						aria-label={theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro"}
					>
						{theme === "dark" ? (
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2" />
								<path d="M12 20v2" />
								<path d="M4.93 4.93l1.41 1.41" />
								<path d="M17.66 17.66l1.41 1.41" />
								<path d="M2 12h2" />
								<path d="M20 12h2" />
								<path d="M4.93 19.07l1.41-1.41" />
								<path d="M17.66 6.34l1.41-1.41" />
							</svg>
						) : (
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
							</svg>
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
