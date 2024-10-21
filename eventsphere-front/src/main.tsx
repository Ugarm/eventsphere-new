
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./config.scss";
import { AuthentificationUserProvider } from "./components/authentification/user/stores/user/AuthentificationUserProvider";
import NavBar from "./components/common/navbar/NavBar.tsx";
import { routes } from "./routers/Route.tsx";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthentificationUserProvider>

            <App />
        </AuthentificationUserProvider>
    </React.StrictMode>
);
