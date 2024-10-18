/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";
import { instance } from "../axios/axios";
import { registerUserData, loginUserData, registerOrganismData, loginOrganismData } from "../components/authentification/types/types";
import { notify } from "../components/common/notification/Notification";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AuthentificationContextProps {
  children: React.ReactNode;
}

interface AuthentificationContextType {
  signup: (data: registerUserData) => Promise<void>;
  login: (data: loginUserData) => Promise<void>;
  logout: () => Promise<void>;
  signupOrganism: (data: registerOrganismData) => Promise<void>;
  loginOrganism: (data: loginOrganismData) => Promise<void>;
  isAuthentificated: {authenticated: boolean, user: any};
  setIsAuthentificated: React.Dispatch<React.SetStateAction<{authenticated: boolean, user: any}>>;
}

const AuthentificationContext = createContext<
  AuthentificationContextType | undefined
>(undefined);
const AuthentificationProvider = ({
  children,
}: AuthentificationContextProps) => {
  const { reset } = useForm();
  const [isAuthentificated, setIsAuthentificated] = useState<{authenticated: boolean, user: any}>({
    authenticated: false,
    user: null,
  });
  const token_name = import.meta.env.VITE_AUTH_TOKEN_NAME

  const signup = async (data: registerUserData) => {
    try {
      const response = await instance.post("/register", data);
      // Notification de succès
      toast.success("Utilisateur créé avec succès !");
      return response.data; // Retourne les données de la réponse
    } catch (error) {
      // Notification d'erreur

      const errorMessage = error?.response?.data?.Message || error.message;

      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };


  const login = async (data: loginUserData, navigate: (path: string) => void) => {
    try {
      const response = await instance.post("/login", data);
      setIsAuthentificated(prevState => ({
        ...prevState,
        authenticated: true,
        user: response?.data?.user,
      }));
      console.log(response.headers)
      localStorage.setItem("token", response?.headers?.authorization);
      localStorage.setItem("user", response?.data.user)
      notify(response?.data?.message, "success");

      // Retours des données pour pouvoir naviguer dans le composant qui utilise useLoginForm
      return response?.data;
    } catch (error: any) {
      notify(error?.response?.data?.message || error.message, "error");
      throw new Error(error?.response?.data?.message || error.message);
    }
  };




  const logout = async () => {
    try {
      const response = await instance.post("/logout");
      setIsAuthentificated(prevState => ({...prevState, authenticated: false, user: null}));
      localStorage.removeItem(token_name);
      localStorage.removeItem("user", reponse?.data.user)
      notify(response?.data?.message, "success");
      return response.data;
    } catch (error: any) {
      return notify(error.message, "error");
    }
  };


  const signupOrganism = async (data: registerOrganismData) => {
    try {
      const response = await instance.post("/organism/register", data);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }

  const loginOrganism = async (data: loginOrganismData) => {
    try {
      const response = await instance.post("/organism/login", data);
      setIsAuthentificated(prevState => ({...prevState, authenticated: true, user: response?.data?.user}));
      localStorage.setItem(token_name, response?.headers?.authorization);
      return response?.data;
    } catch (error: any) {
      return error.message;
    }
  }


  return (
    <AuthentificationContext.Provider
      value={{
        signup,
        login,
        logout,
        signupOrganism,
        loginOrganism,
        isAuthentificated,
        setIsAuthentificated,
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};

export { AuthentificationProvider, AuthentificationContext };
