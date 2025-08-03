"use client"

import { create } from "zustand";

const useMessagesStore = create((set, get) => ({
    // Tin nhắn
    messages: [],
    setMessages: (data) => set({ messages: data }),
    addMessages: (data) => set({ messages: [...data, ...get().messages] }),
    addMessage: (data) => set({ messages: [...get().messages, data] }),
    addTempMessage: (data) => {
        const { id, room_id, session, content, replied_message_id, replied_message } = data;
        if (!id || !room_id || !content || !session || !session?.data?.id) return;

        const tempMsg = {
            id,
            room_id,
            content,
            sender_id: session.data.id,
            sender: session.data,
            replied_message_id: replied_message_id ? replied_message_id : null,
            replied_message: replied_message.id ? replied_message : null,
            is_read: false,
            is_deleted: false,
            is_temp: true
        }

        set({ messages: [...get().messages, tempMsg] });
    },
    replaceTempMessage: (data) => {
        if (!data) return;
        
        const copyMsgs = [...get().messages];
        const copyData = {...data};

        const index = copyMsgs.findIndex(msg => {
            return msg.is_temp && msg.id === copyData.temp_id;
        });
        if (index === -1) return;
        
        delete copyData.temp_id;
        copyMsgs[index] = copyData;
        set({ messages: copyMsgs });
    },
    deleteMessage: (data) => {
        if (!data) return;

        const copyMsgs = [...get().messages];
        const index = copyMsgs.findIndex(msg => msg.id === data.id);
        if (index === -1) return;

        copyMsgs.splice(index, 1);
        
        for (let i = 0; i < copyMsgs.length; i++) {
            if (copyMsgs[i].replied_message_id === data.id) {
                copyMsgs[i] = {
                    ...copyMsgs[i],
                    replied_message: {
                        ...(copyMsgs[i].replied_message || {}),
                        is_deleted: true
                    }
                };
            }
        }

        set({ messages: copyMsgs });
    },
    readMessage: (data) => {
        if (!data) return;

        const copyMsgs = [...get().messages];
        const index = copyMsgs.findIndex(msg => msg.id === data.id);
        if (index === -1) return;

        copyMsgs[index] = data;
        set({ messages: copyMsgs });
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
    // Lần đầu tự động kéo xuống cuối danh sách
    firstScrollBottom: false,
    setFirstScrollBottom: (data) => set({ firstScrollBottom: data }),
    // Phân trang
    pagination: { page: 1, hasNextPage: false },
    setPagination: (data) => set({ pagination: data }),
    // Lỗi
    error: undefined,
    setError: (data) => set({ error: data }),
    // Index phần tử hiển thị đầu tiên
    firstItemIndex: 1000000000,
    setFirstItemIndex: (data) => set({ firstItemIndex: data })
}))

export default useMessagesStore;