const mergeMessages = (messages) => {
    if (messages?.length === 0 || !Array.isArray(messages)) return [];

    const merged = [];
    let currentMerge = null;
    
    for (const message of messages) {
        const copy = {...message};
        delete copy.sender;

        if (!currentMerge || currentMerge.sender.id !== message?.sender.id) {
            currentMerge = {
                sender: message.sender,
                messages: [copy]
            };

            merged.push(currentMerge);
        }
        else currentMerge.messages.push(copy);
    }

    return merged;
}

export const connectGroupMessages = (groupedNew, oldMessages) => {
    if (!Array.isArray(oldMessages) || oldMessages.length === 0) return [];
    if (!Array.isArray(groupedNew) || groupedNew.length === 0) return oldMessages;

    const groupedOld = [...oldMessages];

    const lastNew = groupedNew[groupedNew.length - 1];
    const firstOld = groupedOld[0];

    if (lastNew?.sender?.id === firstOld?.sender?.id) {
        lastNew.messages = [...lastNew.messages, ...firstOld.messages];
        groupedOld.shift();
    }

    return [...groupedNew, ...groupedOld];
}

export const formatMessage = (message) => {
    const copy = {...message};
    delete copy.sender;

    return {
        sender: message?.sender,
        messages: [copy]
    }
}

export const replaceTempMessage = (message, messages) => {
    const copyMessages = [...messages];
    const senderId = message?.sender?.id;

    for (let i = copyMessages.length - 1; i >= 0; i--) {
        const group = copyMessages[i];
        if (group.sender?.id !== senderId) continue;

        for (let j = group.messages.length - 1; j >= 0; j--) {
            const msg = group.messages[j];

            if (msg.id === message?.temp_id && msg.isTemp) {
                const cleanMessage = { ...message };
                delete cleanMessage.temp_id;

                group.messages[j] = cleanMessage;
                return copyMessages;
            }
        }
    }
}

export const connectMessage = (prepareData, oldMessages) => {
    if (!prepareData) return oldMessages;
    if (!Array.isArray(oldMessages) || oldMessages.length === 0) return [];

    const last = oldMessages[oldMessages?.length - 1];

    if (last && last?.sender?.id === prepareData.sender.id) {
        const newGroup = {
            ...last,
            messages: [...last.messages, ...prepareData.messages]
        };

        return [...oldMessages.slice(0, -1), newGroup];
    }

    return [...oldMessages, prepareData];
}

export default mergeMessages;