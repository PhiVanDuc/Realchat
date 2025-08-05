import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const response = await fetch(
            `${process.env.API}/token/refresh`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                cache: "no-cache"
            }
        );

        const result = await response.json();

        if (result.success) {
            const { accessToken, refreshToken } = result.data;

            const res = NextResponse.json(
                {
                    success: true,
                    message: result.message,
                    data: { accessToken }
                },
                { status: response.status }
            );

            res.cookies.set("access-token", accessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                path: "/"
            });

            res.cookies.set("refresh-token", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                path: "/"
            });

            return res;
        }

        return NextResponse.json(
            {
                success: false,
                message: result?.message || "Không thể lấy thông điệp phản hồi từ server!"
            },
            { status: response.status }
        );
    }
    catch(error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Lỗi routes handler!"
            },
            { status: 500 }
        )
    }
}