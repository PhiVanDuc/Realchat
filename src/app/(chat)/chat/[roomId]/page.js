import Room from "@/components/pages/chat/room/room";

export default async function page({ params }) {
    const plainParams = await params;

    return (
        <Room params={plainParams} />
    )
}
