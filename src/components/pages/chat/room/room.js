"use client"

import { useEffect, useState } from "react";

import RoomChat from "./room-chat";
import RoomForm from "./room-form";
import RoomInfo from "./room-info";

export default function Room({ params }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fakeFetch = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(fakeFetch);
    }, []);

    return (
        <section className="xl:pl-[480px] xl:py-[20px] xl:pr-[20px] w-full items-stretch transition-all duration-300">
            <div className="flex flex-col items-center justify-center rounded-[12px] h-full bg-white">
                <RoomInfo loading={loading} />
                <RoomChat loading={loading} />
                <RoomForm />
            </div>
        </section>
    )
}
