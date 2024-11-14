import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from "../common/components/AddItemForm";
import {EditableSpan} from "../common/components/EditableSpan";
import axios from "axios";
import {Todolist} from "../features/todolists/api/todolistsApi.types";
import {DomainTask, Response, UpdateTaskModel} from "../features/todolists/api/tasksApi.types";
import {todolistsApi} from "../features/todolists/api/todolistsApi";
import {tasksApi} from "../features/todolists/api/tasksApi";


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        // get todolists
        todolistsApi.getTodolists()
            .then((res) => {
                const todolists = res.data
                setTodolists(todolists)
                //console.log(todolists)
                todolists.forEach((tl: Todolist) => {
                    tasksApi.getTasks(tl.id)
                    .then(res => {
                        setTasks(tasks => ({...tasks, [tl.id]: res.data.items}))
                    })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        todolistsApi.createTodolist(title)
            .then((res) => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            }
        )
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        todolistsApi.deleteTodolist(id)
            .then((res) => {
                console.log(res.data)
                setTodolists(todolists.filter((tl) => tl.id !== id))
            }
        )
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        todolistsApi.updateTodolist(id, title)
            .then((res) => {
                console.log(res.data)
                setTodolists(todolists.map((tl) => tl.id === id ? {...tl, title} : tl))
            }
        )
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        tasksApi.createTask(title, todolistId)
        .then((res) => {
                console.log(res.data)
                const newTask = res.data.data.item
                const currentTasks = tasks[todolistId] || [] // проверка
                setTasks({...tasks, [todolistId]: [newTask, ...currentTasks]})
            }
        )
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
     tasksApi.removeTask(taskId, todolistId)
            .then(() => {
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
        // update task status
        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        axios.put<Response<{ item: DomainTask }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                console.log(res.data)

                setTasks({
                    ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === res.data.data.item.id
                        ? {...task, status: model.status}
                        : task)
                })
            }
        )
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask, todolistId: string) => {
        // update task title
        const model: UpdateTaskModel = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        axios.put<Response<{ item: DomainTask }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                console.log(res.data)

                setTasks({
                    ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === res.data.data.item.id
                        ? {...task, title: model.title}
                        : task)
                })
            }
        )
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map(tl => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                title={tl.title}
                                callback={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            title={task.title}
                                            callback={title => changeTaskTitleHandler(title, task, tl.id)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}