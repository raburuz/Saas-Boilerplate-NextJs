"use server"
/* NEXT */
import { NextRequest, NextResponse } from "next/server";

/* LIBRARIES */
import { UserRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";

/* ENV */
import { env_server } from "@/env/server.mjs";

/* CONFIG */
import { config } from "@/config";

/* ROUTES */
const PUBLIC_ROUTES  = [ "/auth/login", "/auth/signup" ];
const CUSTOMER_PROTECTED_ROUTES = [ "/dashboard", "/settings", "/onboarding" ];
const ADMIN_PROTECTED_ROUTES = [ "/admin" ];

/* HANDLER */
export default async function AppMiddleware(req: NextRequest){

  const session = await getSessionFromToken(req);
  const user = session?.user;
  const currentRoute = req.nextUrl.pathname;

  // VALIDATORS
  const isCustomerRoute = CUSTOMER_PROTECTED_ROUTES.some(path => currentRoute.startsWith(path));
  const isAdminRoute = ADMIN_PROTECTED_ROUTES.some(path => currentRoute.startsWith(path));
  const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);
  const isProtectedRoute = isCustomerRoute || isAdminRoute;


  // UNAUTHENTICATED - User
  if(!user){ 
    if(isProtectedRoute) return NextResponse.redirect(new URL("/auth/login", req.url) );
    return NextResponse.rewrite( new URL(req.url) );
  }
  
  // AUTHENTICATED - User

  //Public Routes
  if(isPublicRoute){
    if(user.role === UserRole.customer) return NextResponse.redirect( new URL("/dashboard", req.url) );
    if(user.role === UserRole.admin) return NextResponse.redirect( new URL("/admin", req.url) );
  }

  //Private routes 
  if (isProtectedRoute) {

    // ROLE: CUSTOMER
    if(user.role === UserRole.customer){
      
      //Onboarding route
      if( currentRoute !== "/onboarding" ){
        if( !user.isOnboardingComplete && config.hasOnboardingPage ) return NextResponse.redirect( new URL("/onboarding", req.url) );
      }
      
      //admin routes
      if( isAdminRoute ) return NextResponse.redirect( new URL("/dashboard", req.url) );
  
    }
  
    // ROLE: ADMIN
    if(user.role === UserRole.admin) {
      
      //customer routes
      if (isCustomerRoute) return NextResponse.redirect( new URL("/admin", req.url) );

    }
  
  }

  //...Not Catch Routes
  return NextResponse.rewrite( new URL(req.url) );
  
}

//This function must be in the same file that the middleware

interface ISession { 
  email?: string;
  user?: { role: UserRole, isOnboardingComplete: boolean };
}

export const getSessionFromToken = async (req: NextRequest) => {
  return await getToken({ req, secret: env_server.NEXTAUTH_SECRET }) as ISession | null;
}