import React from "react";

export interface Note {
    title: string;
    dateAddedEpoch: Date | null;
    dateAdded: string;
    dueDate: string;
    text: string;
    modList: Array<string>;
    userId: string;
    id: string;
}

export interface AppContextType {
    // Theme State
    theme: string;
    toggleTheme: () => void; // this is saying function the has void return
    // Note Editor State
    wasEditNoteClicked: boolean;
    setEditNoteWasClicked: React.Dispatch<React.SetStateAction<boolean>>;
    // Search Target
    searchTarget: string;
    setSearchTarget: React.Dispatch<React.SetStateAction<string>>;
    // Login Stat
    isLogedIn: string;
    setIsLogedIn: React.Dispatch<React.SetStateAction<string>>; // Consider React.Dispatch<React.SetStateAction<boolean>>
}
