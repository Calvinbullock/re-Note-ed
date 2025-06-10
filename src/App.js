
// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import './App.css';
import HomePage from "./components/HomePage";
import SignInPage from "./components/signIn-SignUp/SignInPage";
import SignUpPage from "./components/signIn-SignUp/SignUpPage";
import { AppProvider } from './components/AppContext';

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function App() {

    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/SignIn" element={<SignInPage />} />
                    <Route path="/SignUp" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}
