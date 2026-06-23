import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUsuarios } from "@/app/actions/admin";
import { bd } from "@/lib/bd";
import AdminUsuariosList from "@/components/admin/admin-usuarios-list";

async function getMetricas() {
  const ahora = new Date();

  const [total, users, usersEdad] = await Promise.all([
    bd.user.count(),
    bd.user.findMany({ select: { createdAt: true } }),
    bd.user.findMany({ select: { fechaNacimiento: true } }),
  ]);

  // Nuevos por mes — últimos 6 meses
  const conteo: Record<string, number> = {};
  for (const u of users) {
    const año = u.createdAt.getFullYear();
    const mes = String(u.createdAt.getMonth() + 1).padStart(2, "0");
    conteo[`${año}-${mes}`] = (conteo[`${año}-${mes}`] ?? 0) + 1;
  }
  const nuevosPorMes = Object.entries(conteo)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 6)
    .reverse();

  // Distribución por edad
  let menores_de_25 = 0, entre_25_y_40 = 0, mayores_de_40 = 0, sin_datos = 0;
  for (const u of usersEdad) {
    if (!u.fechaNacimiento) { sin_datos++; continue; }
    let edad = ahora.getFullYear() - u.fechaNacimiento.getFullYear();
    const cumple = new Date(ahora.getFullYear(), u.fechaNacimiento.getMonth(), u.fechaNacimiento.getDate());
    if (ahora < cumple) edad--;
    if (edad < 25) menores_de_25++;
    else if (edad <= 40) entre_25_y_40++;
    else mayores_de_40++;
  }

  return { total, nuevosPorMes, edad: { menores_de_25, entre_25_y_40, mayores_de_40, sin_datos } };
}

export default async function AdminPage() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;
  if (role !== "adminBuyer" && role !== "adminGlobal") redirect("/");

  const [usuarios, metricas] = await Promise.all([getUsuarios(), getMetricas()]);

  const { total, nuevosPorMes, edad } = metricas;
  const mesActual = nuevosPorMes.at(-1);

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

      {/* Métricas */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {/* Total alquiladores */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
            Alquiladores registrados
          </p>
          <p className="mt-2 text-4xl font-bold text-[var(--text-primary)]">{total}</p>
          {mesActual && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              +{mesActual[1]} este mes
            </p>
          )}
        </div>

        {/* Nuevos por mes */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
            Nuevos por mes (últimos 6)
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {nuevosPorMes.length === 0 ? (
              <p className="text-sm text-[var(--text-tertiary)]">Sin datos</p>
            ) : nuevosPorMes.map(([mes, cantidad]) => {
              const max = Math.max(...nuevosPorMes.map(([, c]) => c), 1);
              const pct = Math.round((cantidad / max) * 100);
              const [año, m] = mes.split("-");
              const nombreMes = new Date(Number(año), Number(m) - 1).toLocaleString("es-AR", { month: "short" });
              return (
                <div key={mes}>
                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span className="capitalize">{nombreMes} {año}</span>
                    <span>{cantidad}</span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                    <div
                      className="h-full rounded-full bg-[var(--btn-primary-bg)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribución por edad */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
            Distribución por edad
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {[
              { label: "< 25 años", value: edad.menores_de_25 },
              { label: "25–40 años", value: edad.entre_25_y_40 },
              { label: "> 40 años", value: edad.mayores_de_40 },
              { label: "Sin datos", value: edad.sin_datos },
            ].map(({ label, value }) => {
              const pct = total > 0 ? Math.round((value / total) * 100) : 0;
              return (
                <div key={label}>
                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>{label}</span>
                    <span>{value} ({pct}%)</span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                    <div
                      className="h-full rounded-full bg-[var(--btn-primary-bg)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AdminUsuariosList usuarios={usuarios} />
    </main>
  );
}