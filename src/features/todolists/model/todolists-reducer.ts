import {Todolist} from "../api/todolistsApi.types";
import {todolistsApi} from "../api/todolistsApi";
import {AppDispatch, AppThunk, RootStateType} from "app/store";
import {RequestStatus, setAppErrorAC, setAppStatusAC} from "app/app-reducer";
import {ResultCode, TaskPriority, TaskStatus} from "../lib/enums";

export type FilterType = "all" | "active" | "completed"

//export type TodolistsType = { id: string; title: string; filter: FilterType }

export type DomainTodolist = Todolist & {
    filter: FilterType,
    entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

/*export type UpdateTodolistDomainModel = {
    addedDate?: string
    entityStatus?: RequestStatus
    filter?: FilterType
    id?: string
    order?: number
    title?: string
}*/

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionTodolistsType,): DomainTodolist[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
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
                entityStatus: 'idle',
                order: 1,
                addedDate: ''
            }
            return [newTodolist, ...state]

        case "CHANGE-TODOLIST-FILTER":
            return state.map((todo) =>
                todo.id === action.payload.todoListId ? {...todo, filter: action.payload.filteredTasks} : todo,
            )

        case "UPDATE-TODOLIST-TITLE":
            return state.map((todo) =>
                todo.id === action.payload.todoListId ? {...todo, title: action.payload.newTitle} : todo,
            )

        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map((todo) =>
                todo.id === action.payload.todoListId ? {...todo, entityStatus: action.payload.entityStatus} : todo,
            )

        ////////////////////////
            //Тест (с общим кейсом, санкой и action) (работает)
       /* case "CHANGE-TODOLIST":
            return state.map((todo) =>
                todo.id === action.payload.todolist.id ? { ...todo, ...action.payload.todolistModel } : todo,
            )*/
        //////////////////////////

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
    | ChangeTodolistIconActionType
   /* | ChangeTodolistActionType //тест*/

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistIconActionType = ReturnType<typeof changeTodolistEntityStatusAC>
//export type ChangeTodolistActionType = ReturnType<typeof changeTodolistAC> //тест

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

export const changeTodolistFilterAC = (todoListId: string, filteredTasks: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {todoListId, filteredTasks},
    } as const
}
export const updateTodolistTitleAC = (payload: { todoListId: string, newTitle: string }) => {
    return {
        type: "UPDATE-TODOLIST-TITLE",
        payload
    } as const
}

export const changeTodolistEntityStatusAC = (payload: { todoListId: string, entityStatus: RequestStatus }) => {
    return {
        type: "CHANGE-TODOLIST-ENTITY-STATUS",
        payload
    } as const
}


//////////////////
//Тест с общим АС (работает)
/*export const changeTodolistAC = (payload: {todolist: DomainTodolist, todolistModel?: UpdateTodolistDomainModel}) => {
    return {
        type: "CHANGE-TODOLIST",
        payload
    } as const
}*/
/////////////////////

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
export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsApi.getTodolists()
        console.log(res.data)
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        throw new Error()
    }


}

export const addTodolistTC = (payload: { title: string }) => async (dispatch: AppDispatch, getState: () => RootStateType) => {
    try {
        dispatch(setAppStatusAC('loading'))
        //const state = getState()
        //console.log(state)
        const {title} = payload
        const res = await todolistsApi.createTodolist(title)
        if (res.data.resultCode === ResultCode.Success) {
            const todoListId = res.data.data.item.id
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addTodolistAC({todoListId, title}))
        } else {
            dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : 'Some error occurred'))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setAppErrorAC(err.message));
        } else {
            dispatch(setAppErrorAC('An unknown error occurred'));
        }
    }
}

export const removeTodolistTC = (payload: { id: string, entityStatus: RequestStatus }) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {id} = payload
        dispatch(changeTodolistEntityStatusAC({todoListId: id, entityStatus: 'loading'}))

        await todolistsApi.removeTodolist(id)
        dispatch(removeTodolistAC({todoListId: id}))
        dispatch(setAppStatusAC('succeeded'))
        // TODO
        //dispatch(changeTodolistEntityStatusAC({todoListId: id, entityStatus: 'idle'}))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        throw new Error()
    }
}

//тест с общим changeTodolistAC (работает)
/*export const removeTodolistTC = (payload: { todolist : DomainTodolist , entityStatus: RequestStatus}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {todolist} = payload

        dispatch(changeTodolistAC({
            todolist: { ...todolist, entityStatus: 'loading' },
            todolistModel: { entityStatus: 'loading' },
        }));

        await todolistsApi.removeTodolist(todolist.id)
        dispatch(removeTodolistAC({todoListId: todolist.id}))
        dispatch(setAppStatusAC('succeeded'))

        dispatch(changeTodolistAC({
            todolist: { ...todolist, entityStatus: 'idle' },
            todolistModel: { entityStatus: 'idle' },
        }));

    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        throw new Error()
    }
}*/

export const updateTodolistTitleTC = (payload: { id: string; newTitle: string }) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {id, newTitle} = payload
        await todolistsApi.updateTodolist(payload)
        dispatch(updateTodolistTitleAC({todoListId: id, newTitle}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        throw new Error()
    }
}

/////////////////////////////////////////////////////////////////

// Тест с одной санкой для изменений статуса, заголовка и фильтра (работает)

/*export const changeTodolistTC = (payload: {todolist: DomainTodolist, entityStatus?: RequestStatus, newTitle?: string, filteredTasks?: FilterType}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {todolist, entityStatus, newTitle, filteredTasks} = payload

        const todolistModel: UpdateTodolistDomainModel = {
            addedDate: todolist.addedDate,
            entityStatus: entityStatus? entityStatus :todolist.entityStatus,
            filter: filteredTasks? filteredTasks: todolist.filter,
            id: todolist.id,
            order: todolist.order,
            title: newTitle? newTitle: todolist.title
        }

        await todolistsApi.changeTodolist({todolist, todolistModel})
        //dispatch(changeTodolistAC({todolist}))
        dispatch(changeTodolistAC({ todolist, todolistModel }));
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        throw new Error()
    }
}*/
//////////////////////////////////////////////////////////////////