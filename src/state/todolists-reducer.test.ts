import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolists-reducer'
import {v4} from 'uuid'
import {TodolistsType} from "../app/App";


let todolistID1: string
let todolistID2: string

let startState: TodolistsType[]

beforeEach(()=> {
    todolistID1 = v4()
    todolistID2 = v4()

// 1. Стартовый state
    startState = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {
    // 2. Действие
   /* const action = {type: 'REMOVE-TODOLIST',payload: {id:todolistID1}}*/
    const endState = todolistsReducer(startState,removeTodolistAC(todolistID1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {

    let newTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})
test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, "completed"))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})
test('correct todolist should change its name', () => {

    let newTitle = "New Todolist"

    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistID2, newTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})