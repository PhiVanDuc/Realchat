const groupMessages = (messages) => {
    if (messages?.length === 0 || !Array.isArray(messages)) return [];

    const grouped = [];
    let currentGroup = null;
    
    for (const message of messages) {
        const copy = {...message};
        delete copy.sender;

        if (!currentGroup || currentGroup.sender.id !== message?.sender.id) {
            currentGroup = {
                sender: message.sender,
                messages: [copy]
            };

            grouped.push(currentGroup);
        }
        else currentGroup.messages.push(copy);
    }

    return grouped;
}

export const connectMessages = (groupedNew, oldMessages) => {
    if (!Array.isArray(groupedNew) || groupedNew.length === 0) return oldMessages;
    if (!Array.isArray(oldMessages) || oldMessages.length === 0) return [];

    const groupedOld = [...oldMessages];

    const lastNew = groupedNew[groupedNew.length - 1];
    const firstOld = groupedOld[0];

    if (lastNew?.sender?.id === firstOld?.sender?.id) {
        lastNew.messages = [...lastNew.messages, ...firstOld.messages];
        groupedOld.shift();
    }

    return [...groupedNew, ...groupedOld];
}

export default groupMessages;