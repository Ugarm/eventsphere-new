import { RouterProvider } from "react-router-dom";
import { routes } from "./routers/Route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./stores/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={routes} />
      </Provider>
        <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
