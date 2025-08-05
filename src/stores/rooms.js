"use client"

import { create } from "zustand";

const useRoomsStore = create((set, get) => ({
    // Phòng
    rooms: [],
    setRooms: (data) => set({ rooms: data }),
    addRooms: (data) => set({ rooms: [...get().rooms, ...data] }),
    updateRoomNewMsg: (data) => {
        if (!data) return;

        const copyRooms = [...get().rooms];
        const index = copyRooms.findIndex(room => room.id === data.id);
        if (index === -1) {
            set({ rooms: [data, ...copyRooms] })
            return;
        }

        copyRooms.splice(index, 1);
        set({ rooms: [data, ...copyRooms] });
    },
    updateRoomDeleteMsg: (data) => {
        if (!data) return;

        const copyRooms = [...get().rooms];
        const index = copyRooms.findIndex(room => room.id === data.id);
        if (index === -1) return;

        if (copyRooms[index].message.id !== data.message.id) return;

        copyRooms[index] = data;
        set({ rooms: copyRooms });
    },
    updateRoomReadMsg: (data) => {
        if (!data) return;

        const copyRooms = [...get().rooms];
        const index = copyRooms.findIndex(room => room.id === data.id);
        if (index === -1) return;

        copyRooms[index] = data;
        set({ rooms: copyRooms });
    },
    // Tải
    loading: true,
    setLoading: (data) => set({ loading: data }),
    // Lấy thêm
    fetchingMore: false,
    setFetchingMore: (data) => set({ fetchingMore: data }),
    // Khởi tạo ban đầu
    initLoaded: false,
    setInitLoaded: (data) => set({ initLoaded: data }),
    // Phân trang
    pagination: { page: 1, hasNextPage: false },
    setPagination: (data) => set({ pagination: data }),
    // Lỗi
    error: undefined,
    setError: (data) => set({ error: data })
}));

export default useRoomsStore;