import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { bd } from "@/lib/bd";
import ProfileForm from "@/components/perfil/profile-form";
import ResumenAlquilador from "@/components/perfil/resumen-alquilador";

export default async function PerfilPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  const user = await bd.user.findUnique({
    where: { id: userId },
  });

  if (!user) redirect("/onboarding");

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const imageUrl = clerkUser.imageUrl;
  const fechaNacimiento = user.fechaNacimiento
    ? user.fechaNacimiento.toISOString().split("T")[0]
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-28 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[var(--border-default)]">
          <Image
            src={imageUrl}
            alt={`${user.nombre ?? "Usuario"}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            {user.nombre && user.apellido
              ? `${user.nombre} ${user.apellido}`
              : "Mi perfil"}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{email}</p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 sm:p-8">
        <h2 className="mb-6 text-base font-semibold text-[var(--text-primary)]">
          Información personal
        </h2>
        <ProfileForm
          nombre={user.nombre}
          apellido={user.apellido}
          email={email}
          fechaNacimiento={fechaNacimiento}
          numeroDocumento={user.numeroDocumento}
          licenciaConducir={user.licenciaConducir}
          direccionFacturacion={user.direccionFacturacion}
        />
      </div>
      <div className="mt-6">
        <ResumenAlquilador userId={userId} />
      </div>
    </main>
  );
}