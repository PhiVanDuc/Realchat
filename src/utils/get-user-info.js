"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const getUserInfo = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token")?.value;

    if (!accessToken) {
        return {
            auth: false,
            info: {}
        };
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        return {
            auth: true,
            accessToken,
            info: decodedToken
        }
    }
    catch(error) {
        return {
            auth: false,
            info: {}
        }
    }
}

export default getUserInfo;