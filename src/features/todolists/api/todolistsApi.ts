import axios from "axios";
import {Response} from "./tasksApi.types";
import {Todolist} from "./todolistsApi.types";


export const todolistsApi = {

    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787'
            }
        })
        return promise
    },

    createTodolist(value: string) {
        return axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: value}, {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    },

    deleteTodolist(id: string) {
        return axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    },

    updateTodolist(id: string, title: string) {
        return axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    }
}