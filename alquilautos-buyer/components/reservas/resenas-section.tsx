"use client";

import { useState, useEffect } from "react";

type EstadoMod = "APROBADA" | "PENDIENTE" | "RECHAZADA";

type ResenaVehiculoNorm = {
  calificacionGeneral: number;
  descripcion: string;
  fechaCreacion: string;
  estado: EstadoMod;
  calificacionLimpieza: number;
  calificacionEstado: number;
  calificacionComodidad: number;
  respuesta: string | null;
};

type ResenaPropietarioNorm = {
  calificacionGeneral: number;
  descripcion: string;
  fechaCreacion: string;
  estado: EstadoMod;
  calificacionComunicacion: number;
  calificacionPuntualidad: number;
  respuesta: string | null;
};

type ResenaAlquiladorNorm = {
  calificacionGeneral: number;
  descripcion: string;
  fechaCreacion: string;
  estado: EstadoMod;
  calificacionComunicacion: number;
  calificacionPuntualidad: number;
  calificacionDevolucion: number;
  idResena: number;
  respuestaExistente: string | null;
};

function getEstadoMod(mods: { id: number; estado: string }[]): EstadoMod {
  if (!mods?.length) return "PENDIENTE";
  const sorted = [...mods].sort((a, b) => b.id - a.id);
  return sorted[0].estado as EstadoMod;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizarVehiculo(data: any): ResenaVehiculoNorm | null {
  const r = data?.resena;
  if (!r?.resenaVehiculo) return null;
  return {
    calificacionGeneral: r.calificacionGeneral,
    descripcion: r.descripcion,
    fechaCreacion: r.fechaCreacion,
    estado: getEstadoMod(r.moderaciones ?? []),
    calificacionLimpieza: r.resenaVehiculo.calificacionLimpieza,
    calificacionEstado: r.resenaVehiculo.calificacionEstado,
    calificacionComodidad: r.resenaVehiculo.calificacionComodidad,
    respuesta: r.respuesta?.comentario ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizarPropietario(data: any): ResenaPropietarioNorm | null {
  const r = data?.resena;
  if (!r?.resenaPropietario) return null;
  return {
    calificacionGeneral: r.calificacionGeneral,
    descripcion: r.descripcion,
    fechaCreacion: r.fechaCreacion,
    estado: getEstadoMod(r.moderaciones ?? []),
    calificacionComunicacion: r.resenaPropietario.calificacionComunicacion,
    calificacionPuntualidad: r.resenaPropietario.calificacionPuntualidad,
    respuesta: r.respuesta?.comentario ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizarAlquilador(data: any): ResenaAlquiladorNorm | null {
  const r = data?.resena;
  if (!r?.resenaAlquilador) return null;
  const respuestaExistente = r.respuesta?.comentario ?? null;
  return {
    calificacionGeneral: r.calificacionGeneral,
    descripcion: r.descripcion,
    fechaCreacion: r.fechaCreacion,
    estado: getEstadoMod(r.moderaciones ?? []),
    calificacionComunicacion: r.resenaAlquilador.calificacionComunicacion,
    calificacionPuntualidad: r.resenaAlquilador.calificacionPuntualidad,
    calificacionDevolucion: r.resenaAlquilador.calificacionDevolucion,
    idResena: Number(r.id),
    respuestaExistente,
  };
}

function EstrellasMini({ valor }: { valor: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${s <= valor ? "text-[var(--color-star)]" : "text-[var(--border-strong)]"}`} fill={s <= valor ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function FilaCalificacion({ label, valor }: { label: string; valor: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <EstrellasMini valor={valor} />
    </div>
  );
}

function formatFecha(fecha: string): string {
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return fecha;
  return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
}

function PlaceholderCard({ titulo, mensaje }: { titulo: string; mensaje: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
      <p className="text-sm font-semibold text-[var(--text-primary)]">{titulo}</p>
      <p className="text-sm italic text-[var(--text-tertiary)]">{mensaje}</p>
    </div>
  );
}

function PendienteCard({ titulo }: { titulo: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{titulo}</p>
        <span className="rounded-full bg-[var(--color-accent-50)] px-2 py-0.5 text-xs font-semibold text-[var(--color-accent-600)]">
          En revisión
        </span>
      </div>
      <p className="text-sm italic text-[var(--text-tertiary)]">Tu reseña está siendo moderada.</p>
    </div>
  );
}

type ResenasSectionProps = {
  idReserva: string;
  idEmisor: string;
};

export default function ResenasSection({ idReserva, idEmisor }: ResenasSectionProps) {
  const [resenaVehiculo, setResenaVehiculo] = useState<ResenaVehiculoNorm | null>(null);
  const [resenaPropietario, setResenaPropietario] = useState<ResenaPropietarioNorm | null>(null);
  const [resenaAlquilador, setResenaAlquilador] = useState<ResenaAlquiladorNorm | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [comentario, setComentario] = useState("");
  const [enviandoRespuesta, setEnviandoRespuesta] = useState(false);
  const [respuestaEnviada, setRespuestaEnviada] = useState(false);
  const [errorRespuesta, setErrorRespuesta] = useState<string | null>(null);

  useEffect(() => {
    const fetchResenas = async () => {
      const [rv, rp, ra] = await Promise.all([
        fetch(`/api/resena/vehiculo/reserva/${idReserva}`).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(`/api/resena/propietario/reserva/${idReserva}`).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(`/api/resena/alquilador/reserva/${idReserva}`).then((r) => r.ok ? r.json() : null).catch(() => null),
      ]);
      const raData = normalizarAlquilador(ra);
      setResenaVehiculo(normalizarVehiculo(rv));
      setResenaPropietario(normalizarPropietario(rp));
      setResenaAlquilador(raData);
      if (raData?.respuestaExistente) setRespuestaEnviada(true);
      setIsLoading(false);
    };
    fetchResenas();
  }, [idReserva]);

  const handleResponder = async () => {
    if (!comentario.trim() || !resenaAlquilador) return;
    setEnviandoRespuesta(true);
    setErrorRespuesta(null);
    try {
      const res = await fetch("/api/respuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idResena: Number(resenaAlquilador.idResena), idAutor: idEmisor, comentario }),
      });
      if (!res.ok) throw new Error("Error al enviar la respuesta");
      setRespuestaEnviada(true);
    } catch (err) {
      setErrorRespuesta(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setEnviandoRespuesta(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-8 text-center text-sm text-[var(--text-secondary)]">
        Cargando reseñas...
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Reseñas de la reserva</h2>

      <div className="flex flex-col gap-4">
        {/* Vehículo */}
        {!resenaVehiculo || resenaVehiculo.estado === "RECHAZADA" ? (
          <PlaceholderCard titulo="Vehículo" mensaje="Todavía no enviaste una reseña" />
        ) : resenaVehiculo.estado === "PENDIENTE" ? (
          <PendienteCard titulo="Vehículo" />
        ) : (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Vehículo</p>
              <EstrellasMini valor={resenaVehiculo.calificacionGeneral} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaVehiculo.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Limpieza" valor={resenaVehiculo.calificacionLimpieza} />
              <FilaCalificacion label="Estado" valor={resenaVehiculo.calificacionEstado} />
              <FilaCalificacion label="Comodidad" valor={resenaVehiculo.calificacionComodidad} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{formatFecha(resenaVehiculo.fechaCreacion)}</p>
            {resenaVehiculo.respuesta && (
              <div className="rounded-2xl bg-[var(--bg-elevated)] px-4 py-3">
                <p className="mb-1 text-xs font-medium text-[var(--text-primary)]">Respuesta del propietario</p>
                <p className="text-sm italic text-[var(--text-secondary)]">{resenaVehiculo.respuesta}</p>
              </div>
            )}
          </div>
        )}

        {/* Propietario */}
        {!resenaPropietario || resenaPropietario.estado === "RECHAZADA" ? (
          <PlaceholderCard titulo="Propietario" mensaje="Todavía no enviaste una reseña" />
        ) : resenaPropietario.estado === "PENDIENTE" ? (
          <PendienteCard titulo="Propietario" />
        ) : (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Propietario</p>
              <EstrellasMini valor={resenaPropietario.calificacionGeneral} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaPropietario.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Comunicación" valor={resenaPropietario.calificacionComunicacion} />
              <FilaCalificacion label="Puntualidad" valor={resenaPropietario.calificacionPuntualidad} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{formatFecha(resenaPropietario.fechaCreacion)}</p>
            {resenaPropietario.respuesta && (
              <div className="rounded-2xl bg-[var(--bg-elevated)] px-4 py-3">
                <p className="mb-1 text-xs font-medium text-[var(--text-primary)]">Respuesta del propietario</p>
                <p className="text-sm italic text-[var(--text-secondary)]">{resenaPropietario.respuesta}</p>
              </div>
            )}
          </div>
        )}

        {/* Sobre vos */}
        {resenaAlquilador?.estado !== "APROBADA" ? (
          <PlaceholderCard titulo="Sobre vos" mensaje="Aún no fuiste reseñado/a" />
        ) : (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Sobre vos</p>
              <EstrellasMini valor={resenaAlquilador.calificacionGeneral} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaAlquilador.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Comunicación" valor={resenaAlquilador.calificacionComunicacion} />
              <FilaCalificacion label="Puntualidad" valor={resenaAlquilador.calificacionPuntualidad} />
              <FilaCalificacion label="Devolución" valor={resenaAlquilador.calificacionDevolucion} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{formatFecha(resenaAlquilador.fechaCreacion)}</p>
            <div className="border-t border-[var(--border-default)] pt-3">
              {respuestaEnviada ? (
                <div className="flex flex-col gap-1.5 rounded-2xl bg-[var(--status-available-bg)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--status-available-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <p className="text-sm font-medium text-[var(--status-available-text)]">Tu respuesta</p>
                  </div>
                  {(resenaAlquilador.respuestaExistente ?? comentario) && (
                    <p className="text-sm text-[var(--status-available-text)] opacity-80">
                      {resenaAlquilador.respuestaExistente ?? comentario}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-[var(--text-primary)]">Responder esta reseña</p>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribí tu respuesta..."
                    rows={2}
                    className="w-full resize-none rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-focus)] focus:outline-none"
                  />
                  {errorRespuesta && <p className="text-xs text-[var(--status-unavailable-text)]">{errorRespuesta}</p>}
                  <button
                    type="button"
                    onClick={handleResponder}
                    disabled={enviandoRespuesta || !comentario.trim()}
                    className="inline-flex h-10 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-50"
                  >
                    {enviandoRespuesta ? "Enviando..." : "Enviar respuesta"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
