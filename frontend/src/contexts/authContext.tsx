import React, { useEffect, useState } from "react";

export interface AuthContextType {
    token?: string;
    email?: string;
    creationTime?: Date;

    setToken: (token: string | null) => void;
}

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

export const AuthContext = React.createContext<AuthContextType>({
    setToken: () => { console.warn("'setToken before initialization") }
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ contextData, setContextData ] = useState<Partial<AuthContextType>>({});

    const setToken = (token: string | null) => {
        if (!token) {
            localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

            setContextData({});
        } else {
            localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token)

            // refresh state
            setContextData({
                email: 'example@example.example',
                token,
                creationTime: new Date()
            });
        }
    }

    useEffect(() => {
        console.log('restore auth context from localstorage');

    })

    return (
        <AuthContext.Provider value={{...contextData, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}