import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useMyContext } from "../../stateLayer/stateProvider.js";

const Login = () => {
    const { updateUser } = useMyContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const userCred = userCredential.user;
            updateUser(userCred);
            localStorage.setItem("email", email);
            localStorage.setItem("user", JSON.stringify(userCred));
            navigate("/portfolio");
        } catch {
            setErrorMessage(
                "Unable to sign in. Check your email and password and try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login">
            <form className="login-container" onSubmit={handleLogin}>
                <p className="login-eyebrow">Investor portal</p>
                <h1>Welcome back</h1>
                <p className="login-intro">
                    Sign in to access your investor account.
                </p>
                <div className="input-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="username"
                        required
                        value={email}
                        placeholder="Enter your email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        placeholder="Enter your password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {errorMessage && (
                    <p className="login-error" role="alert">
                        {errorMessage}
                    </p>
                )}
                <button
                    type="submit"
                    className="login-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
                <p className="login-note">
                    Need help accessing your account? Contact our team.
                </p>
            </form>
        </div>
    );
};

export default Login;
