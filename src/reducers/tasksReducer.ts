/*
* Редьюсер - это чистая функция, которая принимает два аргумента: state and action
* Вся логика ЗДЕСЬ, а не в компонентах
* */
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const tasksReducer = (state: TaskType[], action: TasksReducerActionsType): TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK": {
            /* let filteredTasks = tasks.filter(t => t.id != id);
            setTasks(filteredTasks);*/
            return state.filter((t)=> t.id !== action.payload.id)
        }
        case "ADD-TASK": {
            let task = { id: v1(), title: action.payload.title, isDone: false }
            return [task, ...state]

        }
        default:
            //console.log('vse propalo!')
            return state
    }
}
type TasksReducerActionsType = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC> //автоматическая типизация объекта
type AddTaskACType = ReturnType<typeof addTaskAC> //автоматическая типизация объекта
export const removeTaskAC = (id: string) => { //Action creator создает(возвращает) объект
    return {
        type: "REMOVE-TASK",
        payload: {id}
    } as const // писать обязательно (воспринимать как константу, так как нам нужно чтобы поле type было не просто string, а конкретно "REMOVE-TASK")
}

export const addTaskAC = (title: string) => {
    return {
        type: "ADD-TASK",
        payload: {title}
    } as const
}