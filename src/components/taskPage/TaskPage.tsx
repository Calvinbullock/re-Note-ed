// react modules

// firebase
import { db } from "./../../config/firebase";
import { collection } from "firebase/firestore";

// components
import Nav from "./../nav/Nav";
//import { useAppContext } from "./../AppContext";

//import "./NotePage.css";

export default function TaskPage() {
  const tasksCollectionRef = collection(db, "Tasks");

  return (
    <>
      <Nav />
    </>
  );
}
