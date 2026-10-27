import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useMyContext } from "../../stateLayer/stateProvider.js";

const Login = () => {
    const { updateUser } = useMyContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("weitongbluebusiness@gmail.com");
    const [password, setPassword] = useState("Firefox_55");

    useEffect(() => {
        const lastEmail = localStorage.getItem("email");
        if (lastEmail) {
            setEmail(lastEmail);
        }
    }, []);

    const handlelogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userCred = userCredential.user;
                updateUser(userCred);
                navigate("/Portfolio");
                localStorage.setItem("email", email);
                localStorage.setItem("user", JSON.stringify(userCred));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Welcome Back</h2>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="login-btn"
                    onClick={handlelogin}
                >
                    Log In
                </button>

                <div className="footer-links">
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
