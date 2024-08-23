import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolists-reducer'
import {v4} from 'uuid'
import {TodolistsType} from "../App";


test('correct todolist should be removed', () => {
    let todolistID1 = v4()
    let todolistID2 = v4()

    // 1. Стартовый state
    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Действие
   /* const action = {
        type: 'REMOVE-TODOLIST',
        payload: {id:todolistID1},
    }*/
    const endState = todolistsReducer(startState,removeTodolistAC(todolistID1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v4()
    let todolistID2 = v4()

    let newTitle = "New Todolist"
    let newTodolistId = v4()

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v4()
    let todolistID2 = v4()

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, "completed"))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

test('correct todolist should change its name', () => {
    let todolistID1 = v4()
    let todolistID2 = v4()

    let newTitle = "New Todolist"

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistID2, newTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})