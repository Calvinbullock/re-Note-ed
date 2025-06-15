import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./SignIn-signUp.css";
import { useAppContext } from "../AppContext";

export default function SignUp() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue1, setPassword1] = useState("");
    const [passwordValue2, setPassword2] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const { setIsLogedIn }: any = useAppContext();

    const handleEmailEntry = (event: any) => {
        setEmailValue(event.target.value);
    };
    const handlePassword1Entry = (event: any) => {
        setPassword1(event.target.value);
    };
    const handlePassword2Entry = (event: any) => {
        setPassword2(event.target.value);
    };

    const signUp = async () => {
        try {
            if (passwordValue1 === passwordValue2) {
                setIsPasswordMatch(true);
                await createUserWithEmailAndPassword(
                    auth,
                    emailValue,
                    passwordValue1,
                );
                setIsLogedIn(true);
                navigate("/");
            } else {
                setIsPasswordMatch(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // compare passwords to check match
    useEffect(() => {
        setIsPasswordMatch(passwordValue1 === passwordValue2);
    }, [setIsPasswordMatch, passwordValue1, passwordValue2]);

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
                    className={isPasswordMatch ? "" : "invalid"}
                    aria-label="Enter Account Password"
                    type="password"
                    name=""
                    pattern="[a-zA-Z0-9]+"
                    value={passwordValue1}
                    onChange={handlePassword1Entry}
                    placeholder="password"
                />
                <br />
                <input
                    className={isPasswordMatch ? "" : "invalid"}
                    aria-label="Enter Account Password match"
                    type="password"
                    name=""
                    pattern="[a-zA-Z0-9]+"
                    value={passwordValue2}
                    onChange={handlePassword2Entry}
                    placeholder="password"
                />
                <br />
                {isPasswordMatch ? null : (
                    <p className="errorMsg">Passwords do not match.</p>
                )}
                <button
                    aria-label="Sign Up For Account"
                    onClick={signUp}
                    type="button"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
