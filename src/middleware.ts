import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

// Middleware function to check authentication
export const middleware = (req: NextRequest) => {
  // Check if the user token exists in the cookies
  const token = req.cookies.get("chatUIAuthToken"); // Adjust the key as per your authentication setup

  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return null;

  if (isAuthRoute) {
    if (token) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isPublicRoute && !token) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += `?${nextUrl.search}`;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // If the token exists, allow access to the requested page
  return null;
};

// Apply the middleware to the /dashboard route
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
