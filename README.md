# AlquilAutos — Buyer App

## Deploy de producción

[proyecto-c-buyer-alquilautos.vercel.app](https://proyecto-c-buyer-alquilautos.vercel.app)

---

## Usuarios de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Alquilador | buyer+clerk_test@iaw.com | iawuser# |
| Admin | adminbuyer+clerk_test@iaw.com | iawuser# |

---

## Instrucciones de uso

### Explorar
Página pública accesible sin estar logueado. Muestra todos los vehículos disponibles con filtros por modelo y precio. Al hacer clic en "Más detalles" se requiere estar logueado.

### Mis reservas
Requiere login. Muestra el listado de reservas del usuario. Hay una reserva en cada estado posible (Pendiente, Aceptada, Coordinada, Pagada, Entregada, Finalizada, Cancelada, Rechazada) para facilitar la revisión de cada flujo.

### Mi perfil
Requiere login. Permite editar datos personales, ver el resumen de reseñas generado por IA y las reseñas recibidas.

### Favoritos
Requiere login. Permite guardar y eliminar vehículos favoritos.

### Admin panel
Solo visible para usuarios con rol `adminBuyer`. Permite listar, editar y eliminar usuarios.

---

## Descripción del proyecto

AlquilAutos es una aplicación web para alquilar vehículos entre particulares. Permite a los usuarios explorar vehículos disponibles, realizar reservas, coordinar entregas, gestionar pagos y dejar reseñas sobre vehículos y propietarios.

Forma parte de un ecosistema de microapps que incluye una Seller App (gestión de vehículos), Shipping App (entregas), Payments App (Mercado Pago) y Feedback App (reseñas y calificaciones). La comunicación entre apps se realiza mediante APIs REST. Por el momento la integración con las otras apps está pendiente y se utilizan datos mockeados.

Está construida con Next.js 16, TypeScript, Tailwind CSS, Clerk para autenticación y Prisma + Neon (PostgreSQL) como base de datos.

---

## Notas para la corrección

- **Onboarding obligatorio:** Al registrarse, el usuario no puede navegar por el sistema hasta completar sus datos personales (nombre, apellido, fecha de nacimiento, DNI, licencia de conducir y dirección). El middleware redirige automáticamente al onboarding hasta que se completen.

- **Datos mockeados:** Las reservas, reseñas, vehículos y propietarios que aparecen en el sistema son datos mockeados compartidos entre todos los usuarios. Esto es intencional para facilitar la revisión sin necesidad de generar datos propios.

- **Reserva en cada estado:** Hay una reserva mockeada en cada estado del flujo (Pendiente, Aceptada, Coordinada, Pagada, Entregada, Finalizada, Cancelada, Rechazada) para que se pueda revisar cada acción disponible según el estado.

- **Vehículo indisponible:** El botón "Reservar ahora" se deshabilita automáticamente si el vehículo está en estado indisponible (en caso de entrar mediante link, no es posible entrar a la publicacion de un vehiculo indisponible mediante interacción con el sistema).

- **Validaciones de unicidad:** No se permite registrar dos cuentas con el mismo DNI o licencia de conducir. Tampoco se permite actualizar el perfil con datos (los documentos nombrados antes) que ya pertenezcan a otro usuario.

- **Roles:** El rol `adminBuyer` se asigna manualmente desde el dashboard de Clerk en `publicMetadata`. El panel de administración solo es visible y accesible para este rol.

- **Reseñas en publicaciones:** Las reseñas que aparecen en el detalle de un vehículo y en el perfil del alquilador son mockeadas y las mismas para todos, ya que la integración con la Feedback App está pendiente.



## Documentación técnica

Para más información sobre la arquitectura, endpoints y decisiones de diseño, ver [README_EXTENDED.md](./README_EXTENDED.md).