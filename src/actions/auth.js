"use server"

import { cookies } from "next/headers";
import fetchPublic from "@/lib/fetch/fetch-public";

const signUp = async (data) => {
    const { response, result } = await fetchPublic.post("/auth/sign-up", {
        body: JSON.stringify(data)
    });

    return { status: response?.status || -1, result };
}

const signIn = async (data) => {
    const storageCookies = await cookies();

    const { response, result } = await fetchPublic.post("/auth/sign-in", {
        body: JSON.stringify(data)
    });

    if (result?.success) {
        storageCookies.set({
            name: "access-token",
            value: result?.data?.accessToken,
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        storageCookies.set({
            name: "refresh-token",
            value: result?.data?.refreshToken,
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
    }

    return { status: response?.status || -1, result };
}

const forgotPassword = async (data) => {
    const { response, result } = await fetchPublic.post("/auth/forgot-password", {
        body: JSON.stringify(data)
    });

    return { status: response?.status || -1, result };
}

const signOut = async () => {
    const storageCookies = await cookies();
    storageCookies.delete("access-token");
    storageCookies.delete("refresh-token");
}

const signInGoole = async (sid) => {
    const storageCookies = await cookies();
    const accessToken = storageCookies.get("access-token")?.value;
    const refreshToken = storageCookies.get("refresh-token")?.value;

    if (!accessToken || !refreshToken) return false;
    return true;
}

export {
    signUp,
    signIn,
    forgotPassword,
    signOut,
    signInGoole
}