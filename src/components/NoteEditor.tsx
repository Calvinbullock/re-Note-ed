// react / firebase
import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

// config
import { db, auth } from "./../config/firebase.ts";

// components
import { useAppContext } from "./AppContext.tsx";
import {
    clearInput,
    getNoteLocalStorage,
    clearNoteLocalStorage,
    validateNoteData,
    formateData,
    formateEditData,
} from "../utils/utils.ts";

import "./NoteEditor.css";
import { Note } from "../utils/typedefs.ts";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function NoteEditor() {
    const notesCollectionRef = collection(db, "Notes"); // dataBase connection

    const [titleValue, setTitleEntry] = useState("");
    const [dueDateValue, setDueDateEntry] = useState("");
    const [textValue, setTextEntry] = useState("");
    const [noteId, setId] = useState("");
    const [activateNotifi, setActivateNotifi] = useState("");

    const { wasEditNoteClicked, setEditNoteWasClicked }: any = useAppContext();

    // value changes handlers
    const handleIdEntry = (event: any) => {
        setId(event.target.value);
    };
    const handleTitleEntry = (event: any) => {
        setTitleEntry(event.target.value);
    };
    const handleDueDateChange = (event: any) => {
        setDueDateEntry(event.target.value);
    };
    const handleTextEntry = (event: any) => {
        setTextEntry(event.target.value);
    };

    /*  ===============================================
     *  Clear Editor
     * ============================================= */
    const clearEditor = () => {
        setEditNoteWasClicked(false);

        // clear the values
        clearInput("note-id-entry");
        clearInput("note-title-entry");
        clearInput("note-due-date-entry");
        clearInput("note-text-entry");

        // clear the state
        setId("");
        setTitleEntry("");
        setDueDateEntry("");
        setTextEntry("");
        setActivateNotifi("");

        clearNoteLocalStorage();
    };

    /*  ===============================================
     *  Auto Adjust the text area to fit the content
     * ============================================= */
    useEffect(() => {
        const textarea = document.querySelector(
            ".noteEditor textarea",
        ) as HTMLTextAreaElement | null;

        if (textarea) {
            const container = textarea.parentNode as HTMLElement | null;

            if (container) {
                textarea.addEventListener("input", () => {
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                    container.style.height = "auto";
                });
            }
        }
    }, []);

    /*  ==============================================================================================
     *  Edit Existing Note
     * ============================================================================================ */

    /*  ===============================================
     *  Note Editor State
     *      get the note saved in local storage and
     *      set the values for the editor
     * ============================================= */
    useEffect(() => {
        const noteEdit = getNoteLocalStorage();

        if (noteEdit != null) {
            setId(noteEdit.id);
            setTitleEntry(noteEdit.title);
            setDueDateEntry(noteEdit.dueDate);
            setTextEntry(noteEdit.text);
        }
    }, [wasEditNoteClicked]);

    /*  ===============================================
     *  Submit Edited Note
     *      submit the new note content
     * ============================================= */
    const submitNoteEdit = async () => {
        const docRef = doc(db, "Notes", noteId);

        let data: Partial<Note> = {
            title: titleValue,
            dueDate: dueDateValue,
            text: textValue,
            modList: [],
        };

        data = formateEditData(data);
        const [isValid, errorMsg] = validateNoteData(data);

        setActivateNotifi(errorMsg);
        if (isValid) {
            try {
                await updateDoc(docRef, data);
                clearEditor();
            } catch (err) {
                console.error(err);
            }
        }
    };

    /*  ==============================================================================================
     *  Submit New Note
     * ============================================================================================ */

    /*  ===============================================
     *  Submit the note to fireBase
     * ============================================= */
    const submitNote = async () => {
        const addDate = new Date(Date.now());

        let data: Partial<Note> = {
            title: titleValue,
            dateAddedEpoch: addDate,
            dateAdded: addDate.toLocaleDateString("en-GB"),
            dueDate: dueDateValue,
            text: textValue,
            modList: [],
            userId: auth?.currentUser?.uid,
        };

        data = formateData(data);
        const [isValid, errorMsg] = validateNoteData(data);

        setActivateNotifi(errorMsg);
        if (isValid) {
            try {
                await addDoc(notesCollectionRef, data);
                clearEditor();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="noteEditor">
            <input
                id="note-id-entry"
                type="text"
                name="idEntry"
                value={noteId}
                onChange={handleIdEntry}
            />
            <br />
            <input
                aria-label="Input Note title"
                id="note-title-entry"
                type="text"
                name="titleEntry"
                value={titleValue}
                onChange={handleTitleEntry}
                placeholder="Title"
            />
            <br />
            <input
                aria-label="Input Note Due Date"
                id="note-due-date-entry"
                type="text"
                name="dueDateEntry"
                value={dueDateValue}
                onChange={handleDueDateChange}
                placeholder="Due Date - dd/mm/yyyy"
            />
            <br />
            <textarea
                aria-label="Write Note"
                id="note-text-entry"
                value={textValue}
                onChange={handleTextEntry}
                placeholder="take a note"
            ></textarea>
            <br />

            <div className="noteEditor-buttons">
                {wasEditNoteClicked ? (
                    <button
                        aria-label="Submit Edited Note"
                        onClick={submitNoteEdit}
                    >
                        Re-Add Note
                    </button>
                ) : (
                    <button aria-label="Submit Note" onClick={submitNote}>
                        Add Note
                    </button>
                )}
                <button aria-label="Clear Note Editor" onClick={clearEditor}>
                    clear
                </button>
            </div>
            {activateNotifi === "" ? (
                <></> // Or null
            ) : (
                <p className="errorMsg">{activateNotifi}</p>
            )}
        </div>
    );
}
