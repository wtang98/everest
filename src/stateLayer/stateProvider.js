import React, { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    const updateUser = (newValue) => {
        setUser(newValue);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const currentTime = new Date().getTime();
            const expiryTime = new Date(
                JSON.parse(storedUser)?.stsTokenManager?.expirationTime,
            ).getTime();
            if (currentTime < expiryTime) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(undefined);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const value = {
        user,
        updateUser,
    };

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
    const context = useContext(MyContext);

    if (context === undefined) {
        throw new Error("useMyContext must be used within a MyProvider");
    }

    return context;
};
