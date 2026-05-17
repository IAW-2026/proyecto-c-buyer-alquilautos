import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/dashboard",
  "/dashboard/vehiculo/(.*)",
  "/sign-in(.*)",
]);

export default clerkMiddleware((auth, req) => {
  console.log("PATH:", req.nextUrl.pathname);
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"],
};

