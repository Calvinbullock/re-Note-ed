// config
import { db } from "../../config/firebase";

// node
import { deleteDoc, doc } from "firebase/firestore";

// components
import { setNoteLocalStorage } from "../../utils/utils";
import { useAppContext } from "./../AppContext";
import { Note } from "../../utils/typedefs";

import "./NoteCard.css";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function NoteCard(props: any) {
  const { theme, setEditNoteWasClicked }: any = useAppContext();

  /*  ==============================================
   *  Delete Note
   * ============================================= */
  const deleteNote = async () => {
    try {
      const noteDoc = doc(db, "Notes", props.id);
      await deleteDoc(noteDoc);
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================================
   *  Trigger Note Edit
   * ============================================= */
  const editNote = () => {
    setNoteLocalStorage(props);
    setEditNoteWasClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`noteCard ${theme} ${props.modList?.map((mod: Note) => `${mod}`)} `}
      id={props.id}
    >
      <h3>{props.title}</h3>
      <p>Note From: {props.dateAdded}</p>

      {props.dueDate !== "" && <p>Due On: {props.dueDate}</p>}

      <p>{props.text}</p>

      <div className="noteCard-buttons">
        <button
          className="delete-note-button"
          aria-label="Delete Note"
          onClick={deleteNote}
          type="button"
        >
          DELETE
        </button>

        <button
          className="edit-note-button"
          aria-label="Edit Note"
          onClick={editNote}
          type="button"
        >
          EDIT
        </button>
      </div>
    </div>
  );
}
