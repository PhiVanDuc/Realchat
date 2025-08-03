"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
    const cookiesStorage = await cookies();
    cookiesStorage.delete("access-token");
    cookiesStorage.delete("refresh-token");

    redirect("/auth");
}