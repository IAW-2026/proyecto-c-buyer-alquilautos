import { redirect, notFound } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";
import AdminProfileForm from "@/components/admin/admin-profile-form";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminUsuarioPage({ params }: Props) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;
  if (role !== "adminBuyer") redirect("/");

  const { id } = await params;

  const user = await bd.user.findUnique({ where: { id } });
  if (!user) notFound();

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(id);
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";

  const fechaNacimiento = user.fechaNacimiento
    ? user.fechaNacimiento.toISOString().split("T")[0]
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-28 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link href="/admin" className="transition-colors hover:text-[var(--text-primary)]">
          Admin panel
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">
          {user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : email}
        </span>
      </nav>

      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 sm:p-8">
        <h2 className="mb-6 text-base font-semibold text-[var(--text-primary)]">
          Información personal
        </h2>
        <AdminProfileForm
          userId={id}
          nombre={user.nombre}
          apellido={user.apellido}
          email={email}
          fechaNacimiento={fechaNacimiento}
          numeroDocumento={user.numeroDocumento}
          licenciaConducir={user.licenciaConducir}
          direccionFacturacion={user.direccionFacturacion}
        />
      </div>
    </main>
  );
}