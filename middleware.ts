import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getUserData} from "@/app/lib/auth";

export function middleware(request: NextRequest) {
  const isLoggedIn = !!getUserData();
  const isOnLoginPages = request.nextUrl.pathname.startsWith('/login');
  if (isLoggedIn && isOnLoginPages) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isLoggedIn && !isOnLoginPages) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg$).*)'],
}
