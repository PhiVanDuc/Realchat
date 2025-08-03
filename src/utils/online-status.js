const onlineStatus = (onlineUsers, accountId) => {
    if (!onlineUsers || !accountId || onlineUsers?.length === 0) return false;
    return onlineUsers.includes(accountId);
}

export default onlineStatus;