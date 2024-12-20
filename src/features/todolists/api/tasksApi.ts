import {DomainTask, GetTasksResponse} from "./tasksApi.types"
import {Response} from "common/types/types"
import {instance} from "common/instance/instance"
import {TaskPriority, TaskStatus} from "../lib/enums";

export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}

export const tasksApi = {
  getTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    return promise
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  /*changeTaskStatus(task: DomainTask, todolistId: string, model: UpdateTaskModel) {
        return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
    },*/
  changeTask(payload: { task: DomainTask; todolistId: string; model: UpdateTaskDomainModel }) {
    const { task, todolistId, model } = payload
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
}
