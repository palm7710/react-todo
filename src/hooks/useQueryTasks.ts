import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../types";
import { useError } from "../hooks/useError";
import { create } from "domain";

export const useQueryTasks = () => {
    const { switchErrorHanding } = useError()
    const getTasks = async () => {
        const { data } = await axios.get<Task[]>(
            `${process.env.REACT_APP_API_URL}/tasks`,
            { withCredentials: true }
        )
        return data
    }
    return useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: getTasks,
        staleTime: Infinity,
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHanding(err.response.data.message)
            } else {
                switchErrorHanding(err.response.data)
            }
        }
    })
}