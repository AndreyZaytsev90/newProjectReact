import {DomainTask, GetTasksResponse, Response, UpdateTaskModel} from "./tasksApi.types";
import axios from "axios";

export const tasksApi = {
    getTasks(todolistId: string) {
        const promise = axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
            headers: {
                Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787'
            }
        })
        return promise
    },
    createTask(title: string, todolistId: string) {
        return axios.post<Response<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title}, {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    },
    removeTask(taskId: string, todolistId: string) {
        return axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
            }
        })
    },
    changeTaskStatus(task: DomainTask, todolistId: string, model: UpdateTaskModel) {
        return axios.put<Response<{ item: DomainTask }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    },
    changeTaskTitle(task: DomainTask, todolistId: string, model: UpdateTaskModel){
        return axios.put<Response<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            })
    }
}