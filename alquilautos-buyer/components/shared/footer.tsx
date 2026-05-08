import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<Image
							src="/logo.webp"
							alt="Alquilautos"
							width={32}
							height={32}
						/>
						<span className="text-base font-semibold">Alquilautos</span>
					</div>
					<p className="max-w-sm text-sm text-[var(--text-secondary)]">
						Movilidad a tu medida, sin burocracia.
					</p>
					<div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
						<Link href="https://instagram.com" target="_blank" rel="noreferrer">
							Instagram
						</Link>
						<Link href="https://x.com" target="_blank" rel="noreferrer">
							X
						</Link>
						<Link href="https://linkedin.com" target="_blank" rel="noreferrer">
							LinkedIn
						</Link>
					</div>
				</div>
				<p className="text-xs text-[var(--text-tertiary)]">
					© 2026 Alquilautos. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
}
