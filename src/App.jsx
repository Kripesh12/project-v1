import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Creating a Client
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ token, UpdateToken, count, updateCount }}
        >
          <ToastContainer />
          <RouterProvider router={router} />
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
