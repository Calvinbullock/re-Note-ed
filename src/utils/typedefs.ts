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

/*
export interface _AppContext {
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
}
*/
