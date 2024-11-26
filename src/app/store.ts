import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import {thunk, ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

// непосредственно создаём объект store
//необходимо добавить applyMiddleware() для того чтобы была возможность диспатчить санки(функции)
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootStateType = ReturnType<typeof store.getState>

//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootStateType, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

/*
//Объект store:
{
    state: {
        task: {},
        todolists: {}
    },
    getState(),
    dispatch(),
    subscribe()
}*/
