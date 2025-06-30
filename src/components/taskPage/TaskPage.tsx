// react modules
import { useEffect, useState } from "react";

// firebase
import { db } from "./../../config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

// components
import Nav from "./../nav/Nav";
import { Task } from "../../utils/typedefs";
import { TaskEditorPopup, TaskEditorPopupProps } from "./TaskEditor";
import { TaskCard } from "./TaskCard";

import "./TaskPage.css";

//import "./TaskPage.css";
const DB_COLLECTION = "Tasks";

// Helper function to convert ISO string from Firestore to JavaScript Date
const convertIsoStringToDate = (
  isoString: string | null | undefined,
): Date | null => {
  if (isoString) {
    try {
      const date = new Date(isoString);
      // Basic check if the date is valid (e.g., not "Invalid Date")
      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch (e) {
      console.error("Error converting ISO string to Date:", isoString, e);
    }
  }
  return null;
};

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
  // FIX: Explicitly type taskData as an array of Task objects
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [taskEditorPopupProps, setTaskEditorPopupProps] =
    useState<TaskEditorPopupProps>({
      isOpen: false,
      onClose: () => {
        /**/
      },
      onSave: (task: Task) => console.log("Save not implemented yet for", task), // Or more specific initial logic
      initialTask: null,
    });

  // get all tasks from db
  useEffect(() => {
    const tasksCollectionRef = collection(db, DB_COLLECTION);

    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      try {
        // Ensure that the mapped data matches the Task interface as closely as possible
        const fetchedTasks: Task[] = snapshot.docs.map((doc) => {
          // You might need to cast or carefully construct the Task object
          // if doc.data() doesn't perfectly match your Task type.
          // For simplicity, assuming a direct match or that missing fields are optional.
          const data = doc.data();
          return {
            id: doc.id,
            complete: data.complete || false,
            completionDate: convertIsoStringToDate(
              data.completionDate as string,
            ),
            desc: data.desc || "",
            dateAdded: convertIsoStringToDate(data.dateAdded as string),
            dueDate: convertIsoStringToDate(data.dueDate as string),
            title: data.title || "",
          } as Task; // Cast to Task if needed, but safer to match properties
        });
        setTaskData(fetchedTasks);
      } catch (err) {
        console.log(err);
      }
    });
    return () => unsubscribe();
  }, []);

  // callback for closing task editor and dumping edits
  const onCloseCallback = () => {
    setTaskEditorPopupProps((prevProps) => ({
      ...prevProps,
      isOpen: false,
      initialTask: null,
    }));
  };

  async function handleTaskData(task: Task) {
    try {
      const docRef = await addDoc(collection(db, DB_COLLECTION), task);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id; // Return the ID of the new document
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e; // Re-throw to handle in calling code
    }
  }

  // opens the task editor popup
  function handleAddTask() {
    setTaskEditorPopupProps((prevProps) => ({
      ...prevProps,
      isOpen: !prevProps.isOpen,
    }));
  }

  // htmx element
  return (
    <>
      <Nav />

      <button
        id="button"
        type="button"
        onClick={handleAddTask}
        className="add-task-button"
      >
        Add Task
      </button>

      {/* Conditional rendering to ensure taskData is an array before mapping */}
      {Array.isArray(taskData) &&
        taskData.map((task: Task) => <TaskCard key={task.id} task={task} />)}

      {taskEditorPopupProps.isOpen ? (
        <TaskEditorPopup
          {...taskEditorPopupProps}
          onClose={onCloseCallback}
          onSave={handleTaskData}
        />
      ) : (
        <></>
      )}
      {/* You can remove this for production, it's just for debugging */}
      {/* {JSON.stringify(taskData, null, 2)} */}
    </>
  );
}
