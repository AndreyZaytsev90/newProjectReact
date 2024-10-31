import {FieldError} from "./todolistsApi.types";

export type Response<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldError[],
    data: T
}

export type GetTasksResponse = {
    error: string | null
    items: DomainTask[]
    totalCount: number
}

export type DomainTask = {
    description: string
    title: string
    status: number // 0 | 2
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


enum Enum {
    New,
    Part,
    Completed
}

//console.log(Enum.New)