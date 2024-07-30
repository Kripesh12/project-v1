import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  //Token management state
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );

  const [id, setId] = useState(window.localStorage.getItem("id") || "");

  function UpdateToken(tkn) {
    window.localStorage.setItem("token", tkn);
    setToken(tkn);
  }

  function UpdateId(id) {
    window.localStorage.setItem("token", tkn);
    setId(id);
  }

  return (
    <>
      <UserContext.Provider value={{ token, UpdateToken }}>
        <ToastContainer />
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
