import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC} from '../tasks-reducer'
import {TasksStateType} from '../../../../App'
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

let startState: TasksStateType
beforeEach(()=> {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juice'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][1].isDone).toBeDefined()
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].isDone).toBeDefined()
    expect(endState['todolistId2'][1].isDone).toBe(false)

})
test('current title of specified task should be updated', () => {

    let newTitle = 'newTitle'
    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId1', '3', newTitle))

    expect(endState['todolistId1'][2].title).toBeDefined()
    expect(endState['todolistId1'][2].title).toBe(newTitle)
    expect(endState['todolistId2'][2].title).toBeDefined()
    expect(endState['todolistId2'][2].title).toBe('tea')
})
test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
