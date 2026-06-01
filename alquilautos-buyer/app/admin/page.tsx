import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUsuarios } from "@/app/actions/admin";
import AdminUsuariosList from "@/components/admin/admin-usuarios-list";

export default async function AdminPage() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;
  if (role !== "adminBuyer") redirect("/");

  const usuarios = await getUsuarios();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Panel de administración
        </h1>
        <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
          {usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}
        </p>
      </div>

      <AdminUsuariosList usuarios={usuarios} />
    </main>
  );
}