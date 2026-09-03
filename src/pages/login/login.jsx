import React from "react";
import { useState } from "react";

import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = () => {
    const [email, setEmail] = useState("weitongbluebusiness@gmail.com");
    const [password, setPassword] = useState("Firefox_55");

    const handlelogin = () => {
        console.log("🚀 ~ handlelogin ~ email, password:", email, password);
        email !== "" &&
            password !== "" &&
            signInWithEmailAndPassword(auth, email, password)
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
            <div class="login-container">
                <h2>Welcome Back</h2>
                <div class="input-group">
                    <label for="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" class="login-btn" onClick={handlelogin}>
                    Log In
                </button>

                <div class="footer-links">
                    <a href="/forgot-password">Forgot Password?</a>
                    <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
