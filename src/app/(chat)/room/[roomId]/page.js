import RoomEntry from "./components/RoomEntry";
import RoomBody from "./components/RoomBody";
import RoomFooter from "./components/RoomFooter";
import RoomHeader from "./components/RoomHeader";

import { cn } from "@/libs/utils";

export default async function RoomChat({ params }) {
    const { roomId } = await params;

    return (
        <section
            className={cn(
                "self-stretch w-full flex flex-col bg-white",
                "lg:border lg:border-neutral-200 lg:rounded-[15px]"
            )}
        >
            <RoomEntry roomId={roomId} />
            <RoomHeader roomId={roomId} />
            <RoomBody roomId={roomId} />
            <RoomFooter roomId={roomId} />
        </section>
    )
}
