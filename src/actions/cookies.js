"use server"

import { cookies } from "next/headers";

export const getAccessToken = async () => {
    const cookiesStorage = await cookies();
    const accessToken = cookiesStorage.get("access-token")?.value;

    return accessToken;
}

export const getRefreshToken = async () => {
    const cookiesStorage = await cookies();
    const refreshToken = cookiesStorage.get("refresh-token")?.value;

    return refreshToken;
}