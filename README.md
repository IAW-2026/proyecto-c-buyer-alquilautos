[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/8-wwxMvS)
# buyer

Aplicación **Buyer** del [Proyecto IAW 2026](https://iaw-2026.github.io/proyecto/) — comisión `Alquilautos`.

Esta app corresponde al rol del comprador en los proyectos de tipo **B (Delivery)** y **C (Marketplace)**.

# AlquilAutos — Buyer App

## Cuenta de administrador

| Campo | Valor |
|-------|-------|
| Email | joaco28guti@gmail.com |
| Contraseña | Guti1234567888 |

---

Aplicación web para alquilar vehículos entre particulares. Permite a los usuarios explorar vehículos disponibles, realizar reservas, gestionar entregas y dejar reseñas. Forma parte de un ecosistema de microapps que se comunican entre sí.

---

## Instalación y desarrollo

```bash
# Instalar dependencias
pnpm install

# Generar cliente de Prisma
pnpm prisma generate

# Correr en desarrollo
pnpm dev
```

**Build command en Vercel:**
```bash
pnpm prisma migrate deploy && pnpm prisma generate && pnpm run build
```

---

## Stack tecnológico

- **Framework:** Next.js 16 con Turbopack
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS con variables CSS en `globals.css`
- **Autenticación:** Clerk
- **Base de datos:** Prisma 7 + Neon (PostgreSQL)
- **Package manager:** pnpm
- **Deploy:** Vercel

---

## Variables de entorno

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Base de datos
DATABASE_URL=
```

---

## Ecosistema de microapps

| App | Responsabilidad |
|-----|----------------|
| **Buyer App** (este repo) | Exploración, reservas y gestión del alquilador |
| **Seller App** | Gestión de vehículos y propietarios |
| **Shipping App** | Coordinación de entregas y devoluciones |
| **Payments App** | Procesamiento de pagos (Mercado Pago) |
| **Feedback App** | Reseñas y calificaciones |

---

## Estado actual — Datos mockeados

> **Importante:** La aplicación funciona actualmente con datos mockeados. La integración real con las otras apps está pendiente. Los mocks se encuentran en `app/data/`.

| Archivo | Contenido | Reemplaza a |
|---------|-----------|-------------|
| `app/data/seller.ts` | Vehículos y propietarios | Seller App |
| `app/data/reservas.ts` | Reservas con distintos estados | Seller App |
| `app/data/feedback.ts` | Calificaciones, reseñas y resúmenes | Feedback App |

Todos los endpoints en `app/api/(externos)/` tienen un comentario `TODO` indicando el fetch real que debe reemplazar al mock cuando se integre cada app.

---

## Arquitectura de la aplicación

### Regla principal de datos

- **Server Components** → llaman funciones de `app/services/` directamente
- **Client Components** → fetchean via `fetch("/api/...")` a los endpoints de `app/api/`
- **Nunca** importar datos mock directamente en componentes — siempre pasar por servicios o APIs

### Servicios (`app/services/`)

Capa de abstracción para Server Components. Por ahora retornan mocks pero tienen el `TODO` para el fetch real.

| Servicio | Funciones |
|----------|-----------|
| `seller.ts` | `getVehiculos`, `getVehiculoById`, `getPropietarios`, `getPropietarioById` |
| `reserva.ts` | `getReservaById`, `getReservasByAlquilador`, `getTodasLasReservas` |
| `feedback.ts` | `getCalificacionVehiculo`, `getCalificacionPropietario` |

---

## Funcionalidades implementadas

### Exploración
- Listado de vehículos disponibles con filtros por modelo y precio máximo
- Vista de detalle de vehículo con calificaciones, resumen generado por IA y datos del propietario
- Sección de reseñas del vehículo al final del detalle
- Sección de vehículos destacados en la página de inicio (ordenados por calificación)

### Reservas
- Creación de reservas desde el detalle del vehículo
- Listado de reservas del usuario
- Vista de detalle de reserva con resumen, acciones y datos del propietario

### Flujo de estados de reserva

```
Pendiente → Aceptada → Coordinada → Pagada → Entregada → Finalizada
              ↘
         ↘ Cancelada
         ↘ Rechazada  
```

> Las transiciones de estado las maneja la Seller App. Las cancelaciones marcadas en el diagrama reflejan únicamente los estados desde los cuales **el usuario alquilador puede cancelar desde esta app** (`Pendiente` y `Aceptada`). Los demás cambios de estado son gestionados externamente.

Acciones disponibles según estado:

| Estado | Acción disponible |
|--------|-------------------|
| Pendiente | Cancelar reserva |
| Aceptada | Coordinar entrega (selección de horarios) o cancelar la entrega coordinada |
| Coordinada | Pagar (abre modal con link de Mercado Pago) |
| Finalizada | Escribir reseña + ver reseñas de la reserva |

### Reseñas
- Modal para escribir reseña de vehículo o propietario (desde reservas finalizadas)
- Sección de reseñas en el detalle de reserva finalizada (vehículo, propietario y sobre el alquilador)
- Posibilidad de responder la reseña hecha sobre el alquilador
- Resumen de reseñas generado por IA en el detalle de vehículo

### Favoritos
- Agregar y eliminar vehículos de favoritos
- Listado de favoritos con datos del vehículo, propietario y calificación

### Perfil
- Edición de datos personales (nombre, apellido, fecha de nacimiento, DNI, licencia, dirección)

### Panel de administración (`/admin`)
- Accesible solo para usuarios con rol `adminBuyer` en Clerk
- Listado de todos los usuarios registrados
- Eliminación de usuarios (de Prisma y de Clerk simultáneamente) — **solo para usuarios sin rol `adminBuyer`**
- Edición de datos de cualquier usuario — **solo para usuarios sin rol `adminBuyer`**

---

## Autenticación y roles

Se utiliza **Clerk** para la autenticación. Los roles se gestionan mediante `publicMetadata` en el dashboard de Clerk.

| Rol | Acceso |
|-----|--------|
| `alquilador` | Acceso completo a la app (rol por defecto) |
| `adminBuyer` | Acceso a `/admin` + todas las funcionalidades de alquilador |

Para asignar el rol admin: Dashboard de Clerk → Users → seleccionar usuario → Metadata → Public → `{ "role": "adminBuyer" }`.

---

## Base de datos (Prisma + Neon)

```prisma
model User {
  id                   String    @id // Clerk ID
  email                String    @unique
  nombre               String?
  apellido             String?
  fechaNacimiento      DateTime?
  numeroDocumento      String?   @unique
  licenciaConducir     String?   @unique
  direccionFacturacion String?

  // Relación 1-a-1 con su pool único
  poolFavoritos        FavoritePool?

  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
}

model FavoritePool { ... }  // Pool único por usuario
model FavoriteItem { ... }  // Vehículos externos favoritos
```