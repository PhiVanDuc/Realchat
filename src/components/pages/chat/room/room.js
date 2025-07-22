"use client"

import RoomChat from "./room-chat";
import RoomForm from "./room-form";
import RoomInfo from "./room-info";

export default function Room({ params }) {
    return (
        <section className="w-full flex-1">
            <div className="flex flex-col items-center justify-center rounded-[12px] h-full bg-white xl:border xl:border-neutral-200">
                <RoomInfo params={params} />
                <RoomChat params={params} />
                <RoomForm params={params} />
            </div>
        </section>
    )
}
