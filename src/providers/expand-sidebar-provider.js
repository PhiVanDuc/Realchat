"use client"

import React, { useState, createContext, useContext } from 'react';

const ExpandSidebarContext = createContext(null);

export default function ExpandSidebarProvider({ children }) {
    const [expandSidebar, setExpandSidebar] = useState(false);

    return (
        <ExpandSidebarContext.Provider value={{ expandSidebar, setExpandSidebar }}>
            {children}
        </ExpandSidebarContext.Provider>
    )
}

export const useExpandSidebar = () => {
    const context = useContext(ExpandSidebarContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context;
}