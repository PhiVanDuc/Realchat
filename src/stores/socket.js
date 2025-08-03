import { create } from "zustand";

const useSocketStore = create((set) => ({
    // Socket
    socket: undefined,
    setSocket: (data) => set({ socket: data }),
    // Danh sách người dùng đang online
    onlineUsers: [],
    setOnlineUsers: (data) => set({ onlineUsers: data })
}));

export default useSocketStore;