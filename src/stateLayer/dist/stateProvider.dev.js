// import React, { createContext, useState, useContext, useEffect } from "react";
// const MyContext = createContext();
// export const MyProvider = ({ children }) => {
//     const [user, setUser] = useState(undefined);
//     const updateUser = (newValue) => {
//         setUser(newValue);
//     };
//     useEffect(() => {
//         const userLoginTime = localStorage.getItem("user");
//         const currentTime = new Date().getTime();
//         const loginTime = new Date(
//             userLoginTime.metadata.lastSignInTime,
//         ).getTime();
//         if (currentTime - loginTime >= 3600000) {
//             setUser();
//         }
//     }, []);
//     const value = {
//         user,
//         updateUser,
//     };
//     return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
// };
// export const useMyContext = () => {
//     const context = useContext(MyContext);
//     if (context === undefined) {
//         throw new Error("useMyContext must be used within a MyProvider");
//     }
//     return context;
// };
"use strict";