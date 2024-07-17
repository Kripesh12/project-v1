import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
export const UserContext = createContext();
function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );

  function UpdateToken(tkn) {
    window.localStorage.setItem("token", tkn);
    setToken(tkn);
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
