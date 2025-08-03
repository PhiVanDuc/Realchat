const bubbleMessages = (position, isPartner) => {
    const result = {
        wrapper: "",
        messageBox: ""
    }

    if (position === "single") result.wrapper = "pb-[10px]"

    if (position === "first") {
        result.wrapper = "pb-[3px]"

        if (isPartner) result.messageBox = "rounded-bl-[5px]"
        else result.messageBox = "rounded-br-[5px]"
    }

    if (position === "middle") {
        result.wrapper = "pb-[3px]"

        if (isPartner) result.messageBox = "rounded-tl-[5px] rounded-bl-[5px]"
        else result.messageBox = "rounded-tr-[5px] rounded-br-[5px]"
    }

    if (position === "last") {
        result.wrapper = "pb-[10px]"

        if (isPartner) result.messageBox = "rounded-tl-[5px]"
        else result.messageBox = "rounded-tr-[5px]"
    }

    return result;
}

export default bubbleMessages;