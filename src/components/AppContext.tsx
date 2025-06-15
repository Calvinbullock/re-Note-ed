import { createContext, useContext, useState } from "react";
import { getThemeFromLocalStorage } from "../utils/utils";

const AppContext = createContext({});

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export const AppProvider = ({ children }: any) => {
    /*  =======================================================================
     *      Theme State
     * ===================================================================== */
    const [theme, setTheme] = useState(getThemeFromLocalStorage);
    localStorage.setItem("theme", theme);

    const toggleTheme = () => {
        setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");

        if (theme === "dark-theme") {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        }
    };

    /*  =======================================================================
     *      Note Editor State
     * ===================================================================== */

    const [wasEditNoteClicked, setEditNoteWasClicked] = useState(false);

    /*  =======================================================================
     *     searchTarget
     * ===================================================================== */

    const [searchTarget, setSearchTarget] = useState("");

    /*  =======================================================================
     *     LogInStat
     * ===================================================================== */

    const [isLogedIn, setIsLogedIn] = useState("");

    /*  =======================================================================
     *      context values
     * ===================================================================== */
    const value = {
        // theme dark / light
        theme,
        toggleTheme,
        // note
        wasEditNoteClicked,
        setEditNoteWasClicked,
        // search Target
        searchTarget,
        setSearchTarget,
        // login stat
        isLogedIn,
        setIsLogedIn,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
