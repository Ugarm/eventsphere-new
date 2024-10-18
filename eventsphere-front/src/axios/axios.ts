import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import { useAuthentificationContext } from "../hooks/useFunctionContext"; // Adjust as necessary
import { registerUserData } from "../components/authentification/types/types"; // Ensure the correct path

const api_url = 'http://localhost:8000/api';
const token_name = import.meta.env.VITE_AUTH_TOKEN_NAME;

export const instance = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'application/json'
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(token_name);
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getIpAddress = async (data: registerUserData) => {
    const { signup } = useAuthentificationContext();
    const { mutate } = useMutation({
        mutationFn: signup,
    });

    const getUserIpAddress = async () => {
        try {
            const response = await axios.get('https://api.ipify.org?format=json'); // Consider using `instance` if needed
            return response.data.ip;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'adresse IP :", error);
            return null;
        }
    };

    const ipAddress = await getUserIpAddress();
    if (ipAddress) {
        data.ip_address = ipAddress;
        mutate(data);
    } else {
        console.error("L'adresse IP n'a pas pu être récupérée.");
    }
};
