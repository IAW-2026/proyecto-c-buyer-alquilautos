import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/dashboard",
  "/dashboard/vehiculo/(.*)",
  "/dashboard/propietario/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding",
  "/api/vehiculo/(.*)",
  "/api/propietario/(.*)",
  "/api/alquilador",
  "/api/alquilador/(.*)",
  "/api/resena/(.*)",
  "/api/respuesta",
  "/api/resumen/(.*)",
  "/api/promedio/(.*)",
  "/api/metricas/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const metadata = sessionClaims?.publicMetadata as {
      role?: string;
      onboardingCompleto?: boolean;
    } | undefined;

    // adminGlobal siempre pasa — se auto-registra en BD sin onboarding
    const esAdminGlobal = metadata?.role === "adminGlobal";

    // Si está logueado y no completó el onboarding → redirigir al onboarding
    if (userId && !esAdminGlobal && !metadata?.onboardingCompleto && !isOnboardingRoute(req)) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Proteger rutas admin
    if (isAdminRoute(req)) {
      if (metadata?.role !== "adminBuyer" && metadata?.role !== "adminGlobal") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Proteger rutas privadas
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    signInUrl: "/sign-in",
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};