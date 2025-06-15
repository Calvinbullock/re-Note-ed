import Nav from "./../nav/Nav";
import SignIn from "./SignIn";

import "./SignIn-signUp-page.css";

export default function SignInPage() {
    return (
        <div className="login-page page">
            <Nav />
            <SignIn />
        </div>
    );
}
