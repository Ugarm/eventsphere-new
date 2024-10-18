import { createContext, useState, ReactNode } from "react";
import { loginUserData, registerUserData } from "../../types/types";
import { instance } from "../../../../../axios/axios";

interface AuthentificationUserContextProps {
  children: ReactNode;
}

interface AuthentificationUserContextType {
  isAuthentificated: boolean; // État d'authentification
  setIsAuthentificated: (value: boolean) => void; // Setter pour l'état d'authentification
  signup: (data: registerUserData) => Promise<void>;
  login: (data: loginUserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthentificationUserContext = createContext<AuthentificationUserContextType | undefined>(undefined);

const AuthentificationUserProvider = ({ children }: AuthentificationUserContextProps) => {
  const [isAuthentificated, setIsAuthentificated] = useState(false); // État d'authentification

  const signup = async (data: registerUserData) => {
    try {
      const response = await instance.post("/register", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data: loginUserData) => {
    try {
      const response = await instance.post("http://localhost:8000/login", data);
      setIsAuthentificated(true); // Mettez à jour l'état lors d'une connexion réussie
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      // Si vous avez une API pour la déconnexion, décommentez et utilisez ceci
      // const response = await instance.post("/logout");
      // setIsAuthentificated(false); // Réinitialisez l'état lors de la déconnexion
      console.log("logout");
      setIsAuthentificated(false); // Assurez-vous de réinitialiser l'état de déconnexion
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <AuthentificationUserContext.Provider
          value={{
            isAuthentificated, // État d'authentification
            setIsAuthentificated, // Setter pour l'état
            signup,
            login,
            logout,
          }}
      >
        {children}
      </AuthentificationUserContext.Provider>
  );
};

export { AuthentificationUserProvider, AuthentificationUserContext };
