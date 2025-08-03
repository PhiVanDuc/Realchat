"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const getServerSession = async () => {
    const storagesCookies = await cookies();
    const accessToken = storagesCookies.get("access-token")?.value;
    
    try {
        const data = jwtDecode(accessToken);
        return {
            isAuth: true,
            accessToken,
            data
        }
    }
    catch(error) {
        return {
            isAuth: false,
            accessToken: undefined,
            data: undefined
        }
    }
}

export default getServerSession;