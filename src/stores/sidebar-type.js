"use client"

import { create } from "zustand";

const useSidebarTypeStore = create((set) => ({
    sidebarType: "rooms",
    setSidebarType: (newSidebarType) => set({ sidebarType: newSidebarType })
}));

export default useSidebarTypeStore;