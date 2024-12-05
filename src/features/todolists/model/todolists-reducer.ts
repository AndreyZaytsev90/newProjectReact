import {v4} from "uuid"
import {Todolist} from "../api/todolistsApi.types";
import {todolistsApi} from "../api/todolistsApi";
import {AppDispatch, AppThunk, RootStateType} from "app/store";
import {Dispatch} from "redux";

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
            return state.filter((todo) => todo.id !== action.payload.todoListId)

        case "ADD-TODOLIST":
            //const newTodolistId = v4();
            const newTodolist: DomainTodolist = {
                id: action.payload.todoListId,
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
                todo.id === action.payload.todoListId ? {...todo, title: action.payload.title} : todo,
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

export const setTodolistsAC = (todolists: DomainTodolist[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {todolists}
    } as const
}

export const addTodolistAC = (payload: { todoListId: string, title: string }) => {
    return {
        type: "ADD-TODOLIST",
        payload
    } as const
}

export const removeTodolistAC = (payload: { todoListId: string }) => {
    return {
        type: "REMOVE-TODOLIST",
        payload
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filteredTasks: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {todolistId, filteredTasks},
    } as const
}
export const updateTodolistTitleAC = (payload: { todoListId: string, title: string }) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload
    } as const
}


//Thunks
//из Reducer(BLL) обращаемся в DAL
/*export const fetchTodolistsTC = () => (dispatch: AppDispatch, getState: () => RootStateType) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsApi.getTodolists().then(res => {
        // и диспатчить экшены (action) или другие санки (thunk)
        console.log(res.data)
        dispatch(setTodolistsAC(res.data))
    })
}*/
export const fetchTodolistsTC = () : AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsApi.getTodolists()
        console.log(res.data)
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        throw new Error()
    }


}

export const addTodolistTC = (payload: { title: string }) => (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState()
    console.log(state)
    const {title} = payload
    todolistsApi.createTodolist(title).then((res) => {
        const todoListId = res.data.data.item.id
        dispatch(addTodolistAC({todoListId, title}))
    })
}

export const removeTodolistTC = (payload: { id: string }) => (dispatch: AppDispatch) => {
    const {id} = payload
    todolistsApi.removeTodolist(id).then((res) => {
        dispatch(removeTodolistAC({todoListId: id}))
    })
}

export const updateTodolistTitleTC = (payload: { id: string; title: string }) => (dispatch: AppDispatch) => {
    const {id, title} = payload
    todolistsApi.updateTodolist(payload).then(() => {
        dispatch(updateTodolistTitleAC({todoListId: id, title}))
    })

}