"use client";

import { useState, useEffect } from "react";

type ResenaVehiculo = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_limpieza: number;
  calificacion_estado: number;
  calificacion_comodidad: number;
};

type ResenaPropietario = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
};

type ResenaAlquilador = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
  calificacion_devolucion: number;
};

function EstrellasMini({ valor }: { valor: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${s <= valor ? "text-[var(--color-star)]" : "text-[var(--border-strong)]"}`}
          fill={s <= valor ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
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

type ResenasSectionProps = {
  idReserva: number;
  idEmisor: string;
};

export default function ResenasSection({ idReserva, idEmisor }: ResenasSectionProps) {
  const [resenaVehiculo, setResenaVehiculo] = useState<ResenaVehiculo | null>(null);
  const [resenaPropietario, setResenaPropietario] = useState<ResenaPropietario | null>(null);
  const [resenaAlquilador, setResenaAlquilador] = useState<ResenaAlquilador | null>(null);
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

      setResenaVehiculo(rv ?? null);
      setResenaPropietario(rp ?? null);
      setResenaAlquilador(ra ?? null);
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
        body: JSON.stringify({
          id_resena: resenaAlquilador.id_resena,
          id_autor: idEmisor,
          comentario,
        }),
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

  if (!resenaVehiculo && !resenaPropietario && !resenaAlquilador) return null;

  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        Reseñas de la reserva
      </h2>

      <div className="flex flex-col gap-4">
        {resenaVehiculo && (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Vehículo</p>
              <EstrellasMini valor={resenaVehiculo.calificacion_general} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaVehiculo.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Limpieza" valor={resenaVehiculo.calificacion_limpieza} />
              <FilaCalificacion label="Estado" valor={resenaVehiculo.calificacion_estado} />
              <FilaCalificacion label="Comodidad" valor={resenaVehiculo.calificacion_comodidad} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{resenaVehiculo.fecha_creacion}</p>
          </div>
        )}

        {resenaPropietario && (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Propietario</p>
              <EstrellasMini valor={resenaPropietario.calificacion_general} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaPropietario.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Comunicación" valor={resenaPropietario.calificacion_comunicacion} />
              <FilaCalificacion label="Puntualidad" valor={resenaPropietario.calificacion_puntualidad} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{resenaPropietario.fecha_creacion}</p>
          </div>
        )}

        {resenaAlquilador && (
          <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Sobre vos</p>
              <EstrellasMini valor={resenaAlquilador.calificacion_general} />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resenaAlquilador.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Comunicación" valor={resenaAlquilador.calificacion_comunicacion} />
              <FilaCalificacion label="Puntualidad" valor={resenaAlquilador.calificacion_puntualidad} />
              <FilaCalificacion label="Devolución" valor={resenaAlquilador.calificacion_devolucion} />
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{resenaAlquilador.fecha_creacion}</p>

            <div className="border-t border-[var(--border-default)] pt-3">
              {respuestaEnviada ? (
                <div className="flex items-center gap-2 rounded-2xl bg-[var(--status-available-bg)] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--status-available-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="text-sm font-medium text-[var(--status-available-text)]">
                    Respuesta enviada
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    Responder esta reseña
                  </p>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribí tu respuesta..."
                    rows={2}
                    className="w-full resize-none rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-focus)] focus:outline-none"
                  />
                  {errorRespuesta && (
                    <p className="text-xs text-[var(--status-unavailable-text)]">{errorRespuesta}</p>
                  )}
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