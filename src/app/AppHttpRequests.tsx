import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from "../common/components/AddItemForm";
import {EditableSpan} from "../common/components/EditableSpan";
import axios from "axios";

export type Todolists = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type FieldError = {
    error: string
    field: string
}

export type Response = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldError[],
    data: {
        item: Todolists
    }
}

export type DeleteTodolistResponse = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldError[],
    data: {}
}

export type UpdateTodolistResponse = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldError[],
    data: {}
}


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolists[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        // get todolists
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                //Authorization: 'Bearer d566b0e8-2fa4-4914-b20e-f29ebf528571'
                Authorization: 'Bearer 5ab8c412-f4b1-4daa-9b76-ff327c0d6787'
            }
        }).then((res) => setTodolists(res.data))
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<Response>('https://social-network.samuraijs.com/api/1.1/todo-lists',
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
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
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
        axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
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
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
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
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={e => changeTaskStatusHandler(e, task)}
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