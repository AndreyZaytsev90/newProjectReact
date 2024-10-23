import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from "../common/components/AddItemForm";
import {EditableSpan} from "../common/components/EditableSpan";
import axios from "axios";

export type Todolist = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

export type GetTasksResponse = {
    error: string | null
    items: DomainTask[]
    totalCount: number
}

enum Enum {
    New,
    Part,
    Completed
}

//console.log(Enum.New)

export type DomainTask = {
    description: string
    title: string
    status: number // 0 | 2
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

/*export type CreateTaskResponse = {
    data: {item: DomainTask} | {}
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}*/

type FieldError = {
    error: string
    field: string
}
export type Response<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldError[],
    data: T
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        // get todolists
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787'
            }
        })
            .then((res) => {
                const todolists = res.data
                setTodolists(todolists)
                //console.log(todolists)
                todolists.forEach((tl: Todolist) => {
                    return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                        headers: {
                            Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787'
                        }
                    }).then(res => {
                        setTasks(tasks => ({...tasks, [tl.id]: res.data.items}))
                    })
                })

            })
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            }
        )
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                console.log(res.data)
                setTodolists(todolists.filter((tl) => tl.id !== id))
            }
        )
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                console.log(res.data)
                setTodolists(todolists.map((tl) => tl.id === id ? {...tl, title} : tl))
            }
        )
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<Response<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title}, {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                    Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787',
                    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b'
                }
            }).then((res) => {
                console.log(res.data)

                const newTask = res.data.data.item

                const currentTasks = tasks[todolistId] || [] // проверка
                setTasks({...tasks, [todolistId]: [newTask, ...currentTasks]})
            }
        )
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
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

        axios.put<Response<{
            item: DomainTask
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model, {
                headers: {
                    // Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
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

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
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
                                            callback={title => changeTaskTitleHandler(title, task)}
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