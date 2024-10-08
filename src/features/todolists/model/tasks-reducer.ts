import {v4} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask: TaskType = {id: v4(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.taskStatus}
                    : task
                )
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title}
                    : task
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
            /* let copyState = {...state}
             delete copyState[action.payload.todolistId]
             return copyState*/
            const {[action.payload.todolistId]: [], ...rest} = state;
            return rest;
        }
        default:
            return state
    }
}


export type ActionTasksType =
    RemoveTaskType |
    AddTaskType |
    ChangeTaskStatusType |
    UpdateTaskTitleType |
    AddTodolistType |
    RemoveTodolistType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, taskStatus}
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, title}
    } as const
}
