import {TasksStateType} from "../App";
import {v4} from "uuid";
import {TasksType} from "../Todolist";


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask: TasksType = {id: v4(), title: action.payload.title, isDone: false}
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
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title}
                    : task
                )
            }
        default:
            return state
    }
}
type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatusType | UpdateTaskTitleType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>
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
export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {todolistId, taskId, title}
    } as const
}
