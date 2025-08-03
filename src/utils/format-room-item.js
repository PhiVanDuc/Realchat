const formatRoomItem = (room, accountId) => {
    if (!room || !accountId) return {};

    const copy = {...room};
    const partner = room.members.find(member => member.id !== accountId);

    copy.partner = partner;
    delete copy.members;

    return copy;
}

export default formatRoomItem;