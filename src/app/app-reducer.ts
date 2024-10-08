/*import {TasksStateType} from "./App";
import {ThemeModeType} from "./AppWithRedux";


const initialState: ThemeModeType = {
    themeMode: 'light'
}*/

/*
export const tasksReducer = (state= initialState, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId)
            }
        default:
            return state
    }
}


//export type ActionTasksType = RemoveTaskType

//type RemoveTaskType = ReturnType<typeof removeTaskAC>

/!*export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
}*!/*/


