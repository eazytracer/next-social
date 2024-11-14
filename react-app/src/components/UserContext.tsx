"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
    userId: string | null;
    setUserId: (id: string | null) => void;
    username: string | null;
    setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ userId, setUserId, username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};