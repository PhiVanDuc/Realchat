"use client"

import { useEffect, useState } from 'react';
import getServerSession from '@/actions/session';

export function useSession() {
    const [session, setSession] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getServerSession();
            setSession(result);
        })();
    }, []);

    return session;
}