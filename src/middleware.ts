/* NEXT */
import { NextFetchEvent, NextRequest } from "next/server";

/* BOILERPLATE */
import AppMiddleware from "@/lib/middleware/app";


export default async function middleware(req: NextRequest, ev: NextFetchEvent) {

  /* AUTH */
  return AppMiddleware(req);
}


/* Where the middleware will be call */
export const config = { 
  matcher: [
 /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
 '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)',
  ]
}