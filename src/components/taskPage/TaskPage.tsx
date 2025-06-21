// react modules
import { useEffect, useState } from "react";

// firebase
import { db } from "./../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// components
import Nav from "./../nav/Nav";
import { Task } from "../../utils/typedefs";
import { TaskEditorPopup, TaskEditorPopupProps } from "./TaskEditor";

//import "./TaskPage.css";


/**
 * TaskPage Component
 *
 * This component is responsible for fetching and displaying tasks from a Firestore database.
 * It uses the `useEffect` hook to subscribe to real-time updates from the "Tasks" collection
 * and `onSnapshot` to get the initial data and any subsequent changes.
 *
 * Dependencies:
 * - `db`: Firebase Firestore instance
 * - `collection`, `onSnapshot`: Firebase Firestore functions.
 * - `Nav`: A navigation component
 */
export default function TaskPage() {
  const [taskData, setTaskData] = useState({});
  const [taskEditorPopupProps, setTaskEditorPopupProps] = useState<TaskEditorPopupProps>({});

  // get all tasks from db
  useEffect(() => {
    const tasksCollectionRef = collection(db, "Tasks");

    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      try {
        const taskData: Partial<Task>[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setTaskData(taskData)

      } catch (err) {
        console.log(err);
      }
    })
    return () => unsubscribe();
  }, [])

  const onClose = () => {
    setTaskEditorPopupProps(prevProps => ({
      ...prevProps,
      isOpen: false,
    }));
  }

  function handleAddTask() {
    setTaskEditorPopupProps(prevProps => ({
      ...prevProps,
      isOpen: !prevProps.isOpen,
      onClose: onClose,
    }));
  }


  // htmx element
  return (
    <>
      <Nav />
      <button type="button" onClick={handleAddTask} className="add-task-button">
        Add Task
      </button>
      {
        (taskEditorPopupProps.isOpen) ? ( <TaskEditorPopup {...taskEditorPopupProps}/>) : (<></>)
      }
      {JSON.stringify(taskData)}
    </>
  );
}
