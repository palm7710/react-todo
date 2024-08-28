import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation  } from "@tanstack/react-query";
import useStore from "../store";
import { Credentials } from "../types";
import { useError } from "./useError";

export const useMutateAuth = () => {
    const navigate = useNavigate();
    const resetEditedTask = useStore((state) => state.resetEditedTask)
    const { switchErrorHanding } = useError()
    const loginMutation = useMutation(
        async (user: Credentials) => 
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
        {
            onSuccess: () => {
                navigate('/todo')
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHanding(err.response.data.message)
                } else {
                    switchErrorHanding(err.response.data)
                }
            }
        }
    )
    const registerMutation = useMutation(
        async (user: Credentials) => 
            await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
        {
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHanding(err.response.data.message)
                } else {
                    switchErrorHanding(err.response.data)
                }
            }
        }
    )
    const logoutMutation = useMutation(
        async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
        {
            onSuccess: () => {
                resetEditedTask()
                navigate('/')
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHanding(err.response.data.message)
                } else {
                    switchErrorHanding(err.response.data)
                }
            }
        }
    )
    return { loginMutation, registerMutation, logoutMutation }
}