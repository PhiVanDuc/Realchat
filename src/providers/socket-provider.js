"use client"

import React, { useEffect, useState, createContext, useContext } from 'react';

import { io } from 'socket.io-client';
import getUserInfo from '@/utils/get-user-info';

const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // useEffect(() => {
    //     let socketInstance = null;

    //     const initSocket = async () => {
    //         const userInfo = await getUserInfo();

    //         if (userInfo.auth) {
    //             socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_API, {
    //                 auth: {
    //                     token: userInfo?.accessToken,
    //                     id: userInfo?.info?.id
    //                 }
    //             });

    //             socketInstance.on('connect', () => { setIsConnected(true) });
    //             socketInstance.on('disconnect', () => { setIsConnected(false) });
    //             socketInstance.on('users-online', (data) => { setOnlineUsers(data) });

    //             setSocket(socketInstance);
    //         }
    //     }

    //     initSocket();

    //     return () => {
    //         if (socketInstance) {
    //             socketInstance.close();
    //             setSocket(null);
    //             setIsConnected(false);
    //         }
    //     }
    // }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    
    return context;
}