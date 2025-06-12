import { Note } from "./typedefs";

/**
 * Clears the value of an HTML input element.
 *
 * @param {string} inputId The ID of the input element to clear.
 */
function clearInput(inputId: string) {
    // TODO: there may be error handaling needed for if inputId is not an inputElement
    const inputElement = document.getElementById(inputId) as HTMLInputElement;

    if (inputElement) {
        inputElement.value = '';
    }
}

/**
 * Retrieves the current epoch time in seconds.
 *
 * @returns {number} The current epoch time, rounded down to the nearest second.
 * @example
 * const currentTime = getEpochTimeInSeconds(); // e.g., 1702387200
 */
function getEpochTimeInSeconds(): number {
    return Math.floor(Date.now() / 1000);
}

/**
 * Stores the provided note data in local storage under the key "currentNote".
 * The data is converted to a JSON string before saving.
 *
 * @param {object} noteData - The object representing the note to be stored.
 * @example
 * const myNote = {
 *   dateAdded: string,
 *   dateAddedEpoch: Timestamp,
 *   dueDate: string,
 *   modList: Array<string>,
 *   text: string,
 *   title: string,
 *   userId: string
 * };
 * setNoteLocalStorage(myNote);
 */
function setNoteLocalStorage(noteData: Note) {
    localStorage.setItem("currentNote", JSON.stringify(noteData));
}

/**
 * Retrieves and parses the note data stored in local storage under the key "currentNote".
 *
 * @returns {object | null} The parsed note object if found, or null if "currentNote" is not present or invalid JSON.
 * @example
 * const retrievedNote = getNoteLocalStorage();
 * if (retrievedNote) {
 *   console.log(retrievedNote.title);
 * }
 */
function getNoteLocalStorage(): Note | null {
    const item = localStorage.getItem("currentNote");
    try {
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error("Error parsing currentNote from localStorage:", e);
        return null;
    }
}

/**
 * Clears the "currentNote" entry from local storage by setting it to an empty JSON object `{}`.
 * This effectively removes any previously stored note data.
 */
function clearNoteLocalStorage() {
    localStorage.setItem("currentNote", JSON.stringify({}));
}

/**
 * Retrieves the user's theme preference from local storage.
 * It also applies the retrieved theme to the document body by adding or removing the "dark-theme" class.
 * If no theme is found or if it's "light-theme", "light-theme" is applied by default.
 *
 * @returns {string} The active theme string ("light-theme" or "dark-theme").
 * @example
 * // Call this function on page load to apply the saved theme
 * const currentTheme = getThemeFromLocalStorage();
 * console.log(`Current theme: ${currentTheme}`);
 */
function getThemeFromLocalStorage(): string {
    let theme = localStorage.getItem('theme');

    if (theme == null || theme === "light-theme") {
        theme = "light-theme";
        document.body.classList.remove("dark-theme");
    } else {
        document.body.classList.add("dark-theme");
    }

    return theme;
}

/**
 * Validates user input for a note.
 *
 * @param {object} data - The note data to validate.
 * @param {string} data.dateAdded - The date the note was added (DD/MM/YYYY).
 * @param {string} data.dueDate - The due date of the note (DD/MM/YYYY).
 * @param {string} data.title - The title of the note.
 * @param {string} data.text - The content text of the note.
 * @returns {[boolean, string]} A tuple where the first element is `true` if valid, `false` otherwise.
 * The second element is an empty string if valid, or an error message if invalid.
 */
function validateNoteData(data: Note): (string | boolean)[] {
    // blank date is a valid state
    if (data.dateAdded !== "" && data.dueDate !== "") {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // date should match DD/MM/YYYY

        // due date check
        if (!dateRegex.test(data.dueDate)) {
            return [ false, "Due Date Error" ];
        }
    }

    // Due date is in the past
    const dateAddedMs = new Date(data.dateAdded).getTime(); // in milisecs
    const dueDateMs = new Date(data.dueDate).getTime(); // in milisecs
    if (dueDateMs <= dateAddedMs) {
        return [ false, "Due Date Error" ];
    }

    // check title is not longer then 50 characters
    if (data.title.length > 50) {
        return [ false, `Title text is ${data.title.length - 50} charictors too long` ];
    }

    // check content text is not longer then 450 characters
    if (data.text.length > 450) {
        return [ false, `Content text is ${data.text.length - 450} charictors too long` ];
    }

    // BUG: not quite working yet
    //const dateAddedMs = new Date(data.dateAdded).getTime(); // in milisecs
    //const dueDateMs = new Date(data.dueDate).getTime(); // in milisecs
    //// Date consistency -- dateAdded / dateAddedEpoch verification
    //if (Math.abs(dateAddedMs - data.dateAddedEpoch) > 1000 || !data.dateAddedEpoch || !data.dateAdded) {
    //    //return 2;
    //}

    return [ true, "" ];
}

/**
 * Formats edit data by setting undefined properties to empty strings.
 *
 * @param {object} data - The data object to format.
 * @param {string} [data.title] - The title property.
 * @param {string} [data.text] - The text content property.
 * @returns {object} The formatted data object.
 */
function formateEditData(data: Note): Note {
    // set all undefined to empty string
    if (data.title === undefined) {data.title = ""}
    if (data.text === undefined) {data.text = ""}

    return data;
}

/**
 * Formats data by setting undefined properties to empty strings.
 *
 * @param {object} data - The data object to format.
 * @param {number} [data.dateAddedEpoch] - The epoch timestamp of when the note was added.
 * @param {string} [data.dueDate] - The due date of the note.
 * @param {string} [data.title] - The title of the note.
 * @param {string} [data.text] - The content text of the note.
 * @returns {object} The formatted data object.
 */
function formateData(data: Note): Note {
    // set all undefined to empty string
    if (data.dateAddedEpoch === undefined) {data.dateAddedEpoch = null}
    if (data.dueDate === undefined) {data.dueDate = ""}
    if (data.title === undefined) {data.title = ""}
    if (data.text === undefined) {data.text = ""}

    return data;
}

export {
    clearInput,
    getEpochTimeInSeconds,
    setNoteLocalStorage,
    getNoteLocalStorage,
    clearNoteLocalStorage,
    getThemeFromLocalStorage,
    validateNoteData,
    formateEditData,
    formateData,
}
