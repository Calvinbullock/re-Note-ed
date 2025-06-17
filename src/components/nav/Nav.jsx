import { useNavigate, Link } from "react-router-dom";
import { auth } from "./../../config/firebase.ts";
import { useAppContext } from "../AppContext.tsx";

import "./Nav.css";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function Nav() {
    const navigate = useNavigate();
    const { toggleTheme, setSearchTarget, setIsLogedIn } = useAppContext();

    /*  ===============================================
     *  Login redirect
     * ============================================= */
    const handleSignIn = () => {
        setIsLogedIn(true);
        navigate("/signIn");
    };

    /*  ===============================================
     *  Logout
     * ============================================= */
    const handleSignOut = () => {
        setIsLogedIn(false);
        auth.signOut();
    };

    /*  ===============================================
     *  Set theme
     * ============================================= */
    const handleDarkModeChange = () => {
        toggleTheme();
    };

    /*  ===============================================
     *  Search Notes
     * ============================================= */
    const handleSearch = (event) => {
        setSearchTarget(event.target.value);
    };

    return (
        <div className="nav">
            <Link to="/">
                <img src="" alt="logo" />
            </Link>
            <input
                aria-label="searchBar"
                onChange={handleSearch}
                id="nav-search"
                type=""
                name="search"
                placeholder="search"
            />
            <ul id="suggestionList"></ul>

            {auth.currentUser == null ? (
                <button
                    aria-label="SignIn"
                    onClick={handleSignIn}
                    id="signIn-button"
                    type=""
                >
                    Sign In
                </button>
            ) : (
                <button
                    aria-label="SignOut"
                    onClick={handleSignOut}
                    id="signIn-button"
                    type=""
                >
                    Sign Out
                </button>
            )}
            <button
                aria-label="Dark Mode Toggle"
                onClick={handleDarkModeChange}
                id="dark-mode-switch"
                type=""
            >
                Dark Mode
            </button>
        </div>
    );
}
