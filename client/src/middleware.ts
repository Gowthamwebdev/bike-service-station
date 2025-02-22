import { NextResponse } from 'next/server';

export function middleware(req: any) {
  const token = req.cookies.get('token');

  const protectedRoutes = ['/dashboard', '/view-services', '/bookings'];
    console.log(protectedRoutes)
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('auth/login', req.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/dashboard', '/view-services', '/bookings'], 
};
