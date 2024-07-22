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
  const [count, setCount] = useState(0);

  function UpdateToken(tkn) {
    window.localStorage.setItem("token", tkn);
    setToken(tkn);
  }

  function updateCount(count) {
    setCount(count);
  }
  return (
    <>
      <UserContext.Provider value={{ token, UpdateToken, count, updateCount }}>
        <ToastContainer />
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
