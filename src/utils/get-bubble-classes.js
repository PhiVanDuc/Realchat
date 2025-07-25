function getBubbleClasses(position, isPartner) {
    const result = {
        wrapper: isPartner ? "pl-[15px] pb-[2px]" : "pr-[15px] pb-[3px]",
        textBox: ""
    }

    if (position === "single") {
        result.wrapper = isPartner ? "pl-[15px] pb-[10px]" : "pr-[15px] pb-[10px]";
    }

    if (position === "first") {
        if (isPartner) result.textBox = `${result.textBox} rounded-bl-[5px]`
        else result.textBox = `${result.textBox} rounded-br-[5px]`
    }

    if (position === "middle") {
        if (isPartner) result.textBox = `${result.textBox} rounded-tl-[5px] rounded-bl-[5px]`
        else result.textBox = `${result.textBox} rounded-tr-[5px] rounded-br-[5px]`
    }

    if (position === "last") {
        result.wrapper = isPartner ? "pl-[15px] pb-[10px]" : "pr-[15px] pb-[10px]";

        if (isPartner) result.textBox = `${result.textBox} rounded-tl-[5px]`
        else result.textBox = `${result.textBox} rounded-tr-[5px]`
    }

    return result;
}

export default getBubbleClasses;