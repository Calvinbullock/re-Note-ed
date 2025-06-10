
import React from "react";
import Nav from "./../nav/Nav";
import SignUp from "./SignUp";

import "./SignIn-signUp-page.css"

export default function SignInPage() {

    return (
        <div className="login-page page">
            <Nav />
            <SignUp/>
        </div>
    );
}
