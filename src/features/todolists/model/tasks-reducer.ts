import {v4} from "uuid"
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer"
import {AppDispatch, RootStateType} from "app/store";
import {tasksApi} from "../api/tasksApi";
import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {TaskPriority, TaskStatus} from "../lib/enums";

export type TasksStateType = {
    [key: string]: DomainTask[]
}

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    (task) => task.id !== action.payload.taskId,
                ),
            }
        case "ADD-TASK":
            /* let newTask: DomainTask = {
                 title: action.payload.title,
                 todoListId: action.payload.todolistId,
                 startDate: '',
                 priority: TaskPriority.Low,
                 description: '',
                 deadline: '',
                 status: TaskStatus.New,
                 addedDate: '',
                 order: 0,
                 id: v4(),
             }*/
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
            }
        case "CHANGE-TASK-STATUS":
            return {

                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
                    task.id === action.payload.taskId ? {...task, status: action.payload.taskStatus} : task,
                ),

            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
                    task.id === action.payload.taskId ? {...task, title: action.payload.title} : task,
                ),
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: [],
            }
        case "REMOVE-TODOLIST": {
            /* let copyState = {...state}
                   delete copyState[action.payload.todolistId]
                   return copyState*/
            const {
                [action.payload.todolistId]: [],
                ...rest
            } = state
            return rest
        }
        default:
            return state
    }
}

export type ActionTasksType =
    | RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | UpdateTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetTasksType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type SetTasksType = ReturnType<typeof setTasksAC>

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: 'SET-TASKS',
        payload,
    } as const
}
export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: "REMOVE-TASK",
        //payload: {todolistId, taskId},
        payload,
    } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, taskStatus: TaskStatus }) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload,
    } as const
}
export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload,
    } as const
}

//Thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: AppDispatch) => {
        tasksApi.getTasks(todolistId).then((res) => {
            const tasks = res.data.items
            console.log(res)
            dispatch(setTasksAC({todolistId, tasks}))
        })
    }
}

export const removeTaskTC = (payload: { todolistId: string, taskId: string }) => (dispatch: AppDispatch) => {
    tasksApi.removeTask(payload).then(() => {
        dispatch(removeTaskAC(payload))
    })
}

export const addTaskTC = (payload: { todolistId: string, title: string }) => (dispatch: AppDispatch) => {
    tasksApi.createTask(payload).then((res) => {
        dispatch(addTaskAC({task: res.data.data.item}))
    })
}

export const changeTaskStatusTC = (payload: {todolistId: string, taskId: string, taskStatus: TaskStatus}) => (dispatch: AppDispatch, getState: () => RootStateType) => {

    const { todolistId, taskId , taskStatus} = payload

    const state = getState()
    console.log(state)

    const model: UpdateTaskModel = {
        title: title,
        description: task.description,
        status: taskStatus,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }

    tasksApi.changeTask({ task: state.tasks, todolistId: todolistId, model }).then((res)=> {
        console.log(res)
    })
}

/*
export const changeTaskTitleTC = (payload: {task: DomainTask, todolistId: string, title: string}) => (dispatch: AppDispatch) => {
    tasksApi.changeTask(payload).then(()=> {
        dispatch(changeTaskTitleAC(payload))
    })
}*/
