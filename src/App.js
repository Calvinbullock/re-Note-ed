// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import "./App.css";
import HomePage from "./components/HomePage.jsx";
import SignInPage from "./components/signIn-SignUp/SignInPage.tsx";
import SignUpPage from "./components/signIn-SignUp/SignUpPage.tsx";
import { AppProvider } from "./components/AppContext.tsx";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/SignIn" element={<SignInPage />} />
                    <Route path="/SignUp" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}
