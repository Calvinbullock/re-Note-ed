// react modules
import { useEffect, useState } from "react";

// firebase
import { db } from "./../../config/firebase.ts";
import { collection, onSnapshot } from "firebase/firestore";

// components
import Nav from "./../nav/Nav";
import NoteCard from "./NoteCard.tsx";
import NoteEditor from "./NoteEditor.tsx";
import { useAppContext } from "./../AppContext.tsx";

import "./NotePage.css";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function HomePage() {
    // app context
    const { theme, searchTarget, isLogedIn } = useAppContext();

    const notesCollectionRef = collection(db, "Notes");
    const [noteData, setNoteData] = useState([]);
    const [selectedSort, setSort] = useState("A-Z");
    const [searchMatches, setSearchMatches] = useState([]);

    // sort change handler
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    // get all Notes from DB
    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollectionRef, (snapshot) => {
            try {
                const noteData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setNoteData(noteData);
            } catch (err) {
                console.log(err);
            }
        });
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    // Sort Notes based on selected start type
    if (selectedSort === "A-Z") {
        noteData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "Z-A") {
        noteData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedSort === "newest") {
        noteData.sort((a, b) => b.dateAddedEpoch - a.dateAddedEpoch);
    } else if (selectedSort === "oldest") {
        noteData.sort((a, b) => a.dateAddedEpoch - b.dateAddedEpoch);
    }

    // Note Search Filter
    useEffect(() => {
        if (searchTarget) {
            const filteredNoteData = noteData?.filter((item) =>
                item.title.includes(searchTarget),
            );
            setSearchMatches(filteredNoteData);
        } else {
            setSearchMatches([]);
        }
        // eslint-disable-next-line
    }, [searchTarget]);

    // re-render on logout / login and clear note list
    useEffect(() => {
        if (!isLogedIn) {
            setNoteData([]);
        }
    }, [isLogedIn]);

    // HTML Component
    return (
        <div className={`home page ${theme}`}>
            <Nav />

            <section id="seachResults">
                <div className="note-grid">
                    {searchMatches != null &&
                        searchMatches.map((element, index) => (
                            <NoteCard key={index} {...element} />
                        ))}
                </div>
            </section>

            <section id="note-section">
                <div id="home-edit-note">
                    <NoteEditor />
                </div>

                <div id="note-contianer">
                    <label htmlFor="select-search">Sort By </label>
                    <select
                        id="select-search"
                        value={selectedSort}
                        onChange={handleSortChange}
                    >
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <div className="note-grid">
                        {noteData != null &&
                            noteData.map((element, index) => (
                                <NoteCard key={index} {...element} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
