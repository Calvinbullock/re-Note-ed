// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import "./App.css";
import NotePage from "./components/notePage/NotePage";
import SignInPage from "./components/signIn-SignUp/SignInPage.tsx";
import SignUpPage from "./components/signIn-SignUp/SignUpPage.tsx";
import { AppProvider } from "./components/AppContext.tsx";
//import TaskPage from "./components/taskPage/TaskPage";
import Home from "./components/Home";

/*  ===============================================
 *  COMPONENT DEFINITION
 * ============================================= */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NotePage" element={<NotePage />} />
          {/* <Route path="/TaskPage" element={<TaskPage/>} /> */}
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
