
import {Response} from "./tasksApi.types";
import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";


export const todolistsApi = {

    getTodolists() {
        const promise = instance.get('todo-lists')
        return promise
    },

    createTodolist(value: string) {
        return instance.post<Response<{ item: Todolist }>>('todo-lists', {title: value})
    },

    deleteTodolist(id: string) {
        return instance.delete<Response>(`todo-lists/${id}`)
    },

    updateTodolist(payload: {id: string, title: string}) {
        //Деструктуризация (далее дергаем ключи из объекта, чтобы не соблюдать очередность передачи параметров)
        const {id, title} = payload
        return instance.put<Response>(`todo-lists/${id}`, {title})
    }
}