const replaceTempMessage = (message, list) =>{
    const copyList = [...list];
    const index = copyList.findIndex(item => (message?.temp_id === item?.id && item?.isTemp));

    if (index !== -1) copyList[index] = message;
    return copyList;
}

export default replaceTempMessage;