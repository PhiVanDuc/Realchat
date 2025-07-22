import { NextResponse } from "next/server";
import { jwtDecode } from 'jwt-decode';

const AUTH_PATHS = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/google-success"
];

const PRIVATE_PATHS = [
    "/chat",
    "/create-group"
]

export function middleware(request) {
    const finalResponse = NextResponse.next();

    const { cookies, nextUrl } = request;
    const { pathname: currPath } = nextUrl;
    const pathname = currPath === "/" ? "/home" : currPath;

    const accessToken = cookies.get("access-token")?.value;
    let validAccess = accessToken ? true : false;
    let infoUser;

    const authPage = AUTH_PATHS.some(path => pathname.startsWith(path));
    const privatePage = PRIVATE_PATHS.some(path => pathname.startsWith(path));

    if (validAccess) {
        try {
            infoUser = jwtDecode(accessToken);
            if (!infoUser?.permissions) infoUser.permissions = [];
        } catch (error) {
            console.log("Lỗi khi decode access token");
            console.log(error);
            validAccess = false;
        }
    }

    if (!validAccess) {
        const response = NextResponse.next();
        response.cookies.delete("access-token");
        response.cookies.delete("refresh-token");
        
        if (privatePage) {
            return NextResponse.redirect(
                new URL('/sign-in', request.url),
                { headers: response.headers }
            );
        }

        return response;
    }

    if (validAccess && authPage) {
        return NextResponse.redirect(
            new URL('/', request.url)
        );
    }

    return finalResponse;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};