import { create } from "zustand";

const useRepliedMessageStore = create((set) => ({
    repliedMessage: {},
    setRepliedMessage: (data) => set({ repliedMessage: data })
}));

export default useRepliedMessageStore;