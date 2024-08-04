import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const UserContext = createContext();

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
      },
    },
  });
  //Token management state
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
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
