import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./SignIn-signUp.css";
import { useAppContext } from "../AppContext";

export default function SignIn() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPassword] = useState("");
    const navigate = useNavigate();

    const { setIsLogedIn }: any = useAppContext();

    const handleEmailEntry = (event: any) => {
        setEmailValue(event.target.value);
    };
    const handlePasswordEntry = (event: any) => {
        setPassword(event.target.value);
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, emailValue, passwordValue);
            setIsLogedIn(true);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-box">
            <form action="">
                <input
                    aria-label="Enter Account Email"
                    type="email"
                    name="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={emailValue}
                    onChange={handleEmailEntry}
                    placeholder="email"
                />
                <br />
                <input
                    aria-label="Enter Account Password"
                    type="password"
                    pattern="[a-zA-Z0-9]+"
                    name=""
                    value={passwordValue}
                    onChange={handlePasswordEntry}
                    placeholder="password"
                />
                <br />
                <button
                    aria-label="Sign In Button"
                    onClick={signIn}
                    type="button"
                >
                    Sign In
                </button>
                <br />
            </form>

            <p id="alt-sign-up">
                {" "}
                Click here to make an account <a href="/SignUp">Sign Up</a>
            </p>
        </div>
    );
}
