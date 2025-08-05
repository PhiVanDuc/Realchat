import { create } from "zustand";

const useRoomStore = create((set) => ({
    room: {},
    setRoom: (data) => set({ room: data || {} }),
    submitting: false,
    setSubmitting: (data) => set({ submitting: data })
}));

export default useRoomStore;