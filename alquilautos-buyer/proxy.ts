import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/dashboard",
  "/dashboard/vehiculo/(.*)",
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
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isAdminRoute(req)) {
      const { sessionClaims } = await auth();
      const role = (sessionClaims?.publicMetadata as { role?: string })?.role;
      if (role !== "adminBuyer") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

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