import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUserData } from "../types/types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthentificationContext } from "../../../hooks/useFunctionContext";
import { useNavigate } from 'react-router-dom';
import {ObjectSchema} from "yup";
// import axios from "axios";

// interface IpResponse {
//   ip: string;
// }

const useRegisterForm = () => {
  console.log('useRegisterForm called');
  const { signup } = useAuthentificationContext();
  const navigate = useNavigate();
  // const getUserIpAddress = async (): Promise<string | null> => {
  //   console.log('Fetching IP Address...');
  //   try {
  //     const response = await axios.get<IpResponse>('https://api.ipify.org?format=json');
  //     console.log('IP Address fetched:', response.data.ip);
  //     return response.data.ip;
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //     return null;
  //   }
  // };

  const schema: ObjectSchema<registerUserData>= yup.object({
    lastname: yup.string().required("Ce champ est requis"),
    firstname: yup.string().required("Ce champ est requis"),
    username: yup.string().required("Ce champ est requis"),
    address: yup.string().required("Ce champ est requis"),
    city: yup.string().required("Ce champ est requis"),
    postal_code: yup.string().required("Ce champ est requis").matches(/^(971|972|973|974|975|976|977|978|979|9\d{3}|[0-9]{5})$/, "Code postal non valide"),
    phone_number: yup.string().required("Ce champ est requis").matches(/^(0[1-9][0-9]{8}|(\+33)[1-9][0-9]{8})$/, "Numéro de téléphone non valide"),
    email: yup.string().email().required("Ce champ est requis"),
    password: yup.string().required("Ce champ est requis").min(8, "Le mot de passe doit contenir au moins 8 caractères").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
    confirm_password: yup.string().required("Ce champ est requis").oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas"),
    terms_accepted: yup.bool().oneOf([true], "Vous devez accepter les conditions générales").required(),
    newsletter_subscribed: yup.bool().optional(),
    ip_address: yup.string().optional()
  });

  const { handleSubmit, register, formState: { errors } } = useForm<registerUserData>({ resolver: yupResolver(schema) });

  console.log('Registered fields:', Object.keys(register));

  const { mutate } = useMutation({
    mutationFn: async (data: registerUserData) => {
      console.log('Calling signup with:', data);
      return signup(data);
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    },
    onSuccess: () => {
      navigate('/login');
    },

  });

  const handleSignup = async (data: registerUserData) => {
    console.log('Preparing to sign up with data:', data);
    // Mocking IP Address for local testing
    const ipAddress = '127.0.0.1';
    console.log("Mocked IP Address:", ipAddress);

    if (ipAddress) {
      data.ip_address = ipAddress;
      console.log('Final data to submit:', data);
      mutate(data);
    } else {
      console.error("IP address could not be retrieved.");
    }
  };

  return {
    handleSubmit,
    register,
    handleSignup,
    errors,
  };
};

export { useRegisterForm };
