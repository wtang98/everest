import React from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = () => {
    const login = () => {
        signInWithEmailAndPassword(
            auth,
            "weitongbluebusiness@gmail.com",
            "Firefox_55",
        )
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("🚀 ~ Login ~ user:", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <div className="login">
            <div className="login__logo"></div>
            <button type="submit" onClick={login}>
                Sign In
            </button>
        </div>
    );
};

export default Login;
