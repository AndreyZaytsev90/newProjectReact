import {Response} from "common/types"
import {instance} from "common/instance"
import {DomainTodolist,
  /*UpdateTodolistDomainModel*/
} from "../model/todolists-reducer";

export const todolistsApi = {
  getTodolists() {
    const promise = instance.get<DomainTodolist[]>("todo-lists")
    return promise
  },

  createTodolist(value: string) {
    return instance.post<Response<{ item: DomainTodolist }>>("todo-lists", { title: value })
  },

  removeTodolist(id: string) {
    return instance.delete<Response>(`todo-lists/${id}`)
  },

  updateTodolist(payload: { id: string; newTitle: string }) {
    //Деструктуризация (далее дергаем ключи из объекта, чтобы не соблюдать очередность передачи параметров)
    const { id, newTitle } = payload
    return instance.put<Response>(`todo-lists/${id}`, { newTitle })
  },

  //Тест с общей санкгой и запросом (работает)
 /* changeTodolist(payload: {todolist: DomainTodolist, todolistModel: UpdateTodolistDomainModel }) {
    //Деструктуризация (далее дергаем ключи из объекта, чтобы не соблюдать очередность передачи параметров)
    const { todolist, todolistModel } = payload
    return instance.put<Response>(`todo-lists/${todolist.id}`, todolistModel)
  },*/
}
