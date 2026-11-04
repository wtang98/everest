import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthReady(true);
        });
    }, []);

    const value = {
        user,
        authReady,
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
