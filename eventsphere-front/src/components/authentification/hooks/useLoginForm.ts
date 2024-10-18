// useLoginForm.ts
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthentificationContext } from "../../../hooks/useFunctionContext";
import { loginUserData } from "../types/types";
import { notify } from "../../../components/common/notification/Notification";
import { AuthentificationUserContext } from "../../authentification/user/stores/user/AuthentificationUserProvider";
import {useContext} from "react";

const useLoginForm = (navigate: (path: string) => void) => {
  const { login } = useAuthentificationContext();

  const schema = yup.object().shape({
    email: yup.string().email("Email invalide").required("Ce champ est requis"),
    password: yup
        .string()
        .required("Ce champ est requis")
        .min(8, "Le mot de passe doit avoir au moins 8 caractères"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: loginUserData) => {
      console.log('Trying to log in with:', data);
      return login(data); // on ne passe pas navigate ici
    },
    onError: (error: any) => {
      console.error("Erreur de connexion :", error);
      notify(error?.response?.data?.message || "Erreur lors de la connexion", "error");
    },
  });

  const { setIsAuthentificated } = useContext(AuthentificationUserContext);
  const handleLogin = (data: loginUserData) => {
    console.log("Données de connexion :", data);
    mutate(data, {
      onSuccess: () => {
        setIsAuthentificated(true);
        console.log("Connexion réussie !");
        navigate('/'); // Redirection après connexion réussie
      },
    });
  };

  return {
    handleSubmit,
    handleLogin,
    register,
    errors,
  };
};

export { useLoginForm };
