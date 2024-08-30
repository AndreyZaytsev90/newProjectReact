import { TodolistsType } from "../App";
import { v4 } from "uuid";
import { FilterType } from "../Todolist";



let todolistID1 = v4()
let todolistID2 = v4()

const initialState: TodolistsType[] = [
	{ id: todolistID1, title: 'What to learn', filter: 'all' },
	{ id: todolistID2, title: 'What to buy', filter: 'all' },
]



export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionTodolistsType): TodolistsType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST":
			return state.filter((todo) => todo.id !== action.payload.todolistId)

		case "ADD-TODOLIST":
			//const newTodolistId = v4();
			const newTodolist: TodolistsType = {
				id: action.payload.todolistId,
				//id: newTodolistId,
				title: action.payload.title,
				filter: 'all'
			}
			return [newTodolist, ...state]

		case "CHANGE-TODOLIST-FILTER":
			return state.map((todo) => todo.id === action.payload.todolistId
				? { ...todo, filter: action.payload.filteredTasks }
				: todo
			)

		case "UPDATE-TODOLIST-TITLE":
			return state.map((todo) => todo.id === action.payload.todolistId
				? { ...todo, title: action.payload.title }
				: todo
			)

		default:
			return state
	}
}

export type ActionTodolistsType = RemoveTodolistType | AddTodolistType | ChangeTodolistFilterACType | UpdateTodolistTitleACType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: { todolistId }
	} as const
}
export const addTodolistAC = (title: string) => {
	return {
		type: 'ADD-TODOLIST',
		payload: {todolistId: v4(), title }
	} as const
}
export const changeTodolistFilterAC = (todolistId: string, filteredTasks: FilterType) => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		payload: { todolistId, filteredTasks }
	} as const
}
export const updateTodolistTitleAC = (todolistId: string, title: string) => {
	return {
		type: 'UPDATE-TODOLIST-TITLE',
		payload: { todolistId, title }
	} as const
}
