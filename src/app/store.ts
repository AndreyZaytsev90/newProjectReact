import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {changeModeReducer} from "../state/changeMode-reducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    themes: changeModeReducer
})

// непосредственно создаём объект store
export const store = legacy_createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type RootStateType = ReturnType<typeof store.getState>

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