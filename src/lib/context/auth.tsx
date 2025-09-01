"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation";
import { safeLocalStorage } from "@/utils/safeLocalStorage";


type AuthContextProviderProps = {
    children: ReactNode
}

type createContextType = {
    userData: UserDataType | null,
    saveUserData: () => void,
    logout: () => void,
    menuId: string | null,
    sendMenuId: (id: string) => void
}

export type UserDataType = {
    id: string,
    role: string,
    userName: string
}

export const AuthContext = createContext<createContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const router = useRouter();

    const saveUserData = () => {
        try {
            const encodedToken: string | null = safeLocalStorage.get("hadramoot");
            if (!encodedToken) return;

            const decodedToken: UserDataType = jwtDecode(encodedToken);
            setUserData(decodedToken);
        } catch (error) {
            console.error("Invalid token", error);
            logout();
        }
    };

    useEffect(() => {
        if (safeLocalStorage.get("hadramoot")) {
            saveUserData()
        }
    }, [])

    const logout = () => {
        safeLocalStorage.remove("hadramoot");
        setUserData(null);
        router.push("/login");
    }


    const [menuId, setMenuId] = useState<string | null>(null);
    const sendMenuId = (id: string) => {
        setMenuId(id)
    }


    return <AuthContext.Provider value={{
        userData,
        saveUserData,
        logout,

        menuId,
        sendMenuId,
    }}>
        {children}
    </AuthContext.Provider>
}