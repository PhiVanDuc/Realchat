const replaceTempMessage = (message, list) =>{
    const copyList = [...list];
    const copyMessage = {...message};

    const index = copyList.findIndex(item => (copyMessage?.temp_id === item?.id && item?.isTemp));
    delete copyMessage.temp_id;

    if (index !== -1) copyList[index] = copyMessage;
    return copyList;
}

export default replaceTempMessage;