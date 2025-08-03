"use client"

import { create } from "zustand";

const useAccountsStore = create((set, get) => ({
    // Tài khoản
    accounts: [],
    setAccounts: (data) => set({ accounts: data }),
    addAccounts: (data) => set({ accounts: [...get().accounts, ...data] }),
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
    setError: (data) => set({ error: data }),
}));

export default useAccountsStore;