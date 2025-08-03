"use client"

import { create } from "zustand";

const useSidebarExpandStore = create((set) => ({
    sidebarExpand: false,
    setSidebarExpand: (data) => set({ sidebarExpand: data })
}));

export default useSidebarExpandStore;