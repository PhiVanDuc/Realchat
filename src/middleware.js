import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const AUTH_PATHS = ["/auth", "/auth/sign-up"];

export async function middleware(request) {
    // const { cookies, nextUrl } = request;
    // const { pathname } = nextUrl;

    // const accessToken = cookies.get("access-token")?.value;
    // let validAccess = accessToken ? true : false;

    // const authPage = AUTH_PATHS.some(path => pathname.startsWith(path));

    // if (validAccess) {
    //     try { jwtDecode(accessToken) }
    //     catch (error) { validAccess = false }
    // }

    // if (!validAccess) {
    //     const response = NextResponse.next();
    //     response.cookies.delete("access-token");
    //     response.cookies.delete("refresh-token");

    //     if (!authPage) {
    //         return NextResponse.redirect(
    //             new URL('/auth', request.url),
    //             { headers: response.headers }
    //         );
    //     }

    //     return response;
    // }

    // if (validAccess && authPage) {
    //     return NextResponse.redirect(
    //         new URL('/', request.url)
    //     );
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};