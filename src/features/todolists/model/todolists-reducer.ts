import {v4} from "uuid"
import {Todolist} from "../api/todolistsApi.types";

export type FilterType = "all" | "active" | "completed"

//export type TodolistsType = { id: string; title: string; filter: FilterType }

export type DomainTodolist = Todolist & {
    filter: FilterType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionTodolistsType,): DomainTodolist[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
        }

        case "REMOVE-TODOLIST":
            return state.filter((todo) => todo.id !== action.payload.todolistId)

        case "ADD-TODOLIST":
            //const newTodolistId = v4();
            const newTodolist: DomainTodolist = {
                id: action.payload.todolistId,
                //id: newTodolistId,
                title: action.payload.title,
                filter: "all",
                order: 1,
                addedDate: ''

            }
            return [newTodolist, ...state]

        case "CHANGE-TODOLIST-FILTER":
            return state.map((todo) =>
                todo.id === action.payload.todolistId ? {...todo, filter: action.payload.filteredTasks} : todo,
            )

        case "UPDATE-TODOLIST-TITLE":
            return state.map((todo) =>
                todo.id === action.payload.todolistId ? {...todo, title: action.payload.title} : todo,
            )

        default:
            return state
    }
}

export type ActionTodolistsType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistFilterACType
    | UpdateTodolistTitleACType
    | SetTodolistsActionType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistId},
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolistId: v4(), title},
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filteredTasks: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {todolistId, filteredTasks},
    } as const
}
export const updateTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload: {todolistId, title},
    } as const
}

export const setTodolistsAC = (todolists: DomainTodolist[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {todolists}
    } as const
}
