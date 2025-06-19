// components
import Nav from "../components/nav/Nav";

//import "./NotePage.css";

export default function Home() {
  return (
    <>
      <Nav />
      <a href="/TaskPage">Task</a>
      <br />
      <a href="/NotePage">Note</a>
    </>
  );
}
