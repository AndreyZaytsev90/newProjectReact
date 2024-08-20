import './App.css';
import {Button as SuperButton} from "./Button";
import Button from '@mui/material/Button';
//import { ChangeEvent, KeyboardEvent, useState } from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

export type FilterType = "all" | "active" | "completed"

export interface TasksType {
    id: string,
    title: string,
    isDone: boolean
}

interface TodolistType {
    todolistId: string,
    title: string,
    tasks: Array<TasksType>,
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filteredTasks: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterType
}


export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             removeTask,
                             changeTodolistFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             updateTaskTitle,
                             updateTodolistTitle,
                             filter
                         }: TodolistType) => {


    const filteredTodolistTasks: Array<TasksType> =
        (filter === "active")
            ? tasks.filter(task => !task.isDone)
            : (filter === "completed")
                ? tasks.filter(task => task.isDone)
                : tasks

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        removeTask(todolistId, taskId)
    }
    const filterTaskHandler = (todolistId: string, filteredTasks: FilterType) => {
        changeTodolistFilter(todolistId, filteredTasks)
    }

    const onAllClickHandler = () => filterTaskHandler(todolistId, 'all')
    const onActiveClickHandler = () => filterTaskHandler(todolistId, 'active')
    const onCompletedClickHandler = () => filterTaskHandler(todolistId, 'completed')

    const removeTodolistHandler = (todolistId: string) => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        //console.log("todolistId", todolistId)
        addTask(todolistId, title)
    }


    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todolistId, taskId, newTitle)
    }

    const updateTodolistHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }


    return (
        <div className="todolist">
            <div className={'todolist-title-container'}>

                <h3><EditableSpan globalTitle={title} callback={updateTodolistHandler}/></h3>

                <IconButton aria-label="delete" size="small" onClick={() => removeTodolistHandler(todolistId)}>
                    <DeleteIcon style={{color: '#B00909FF'}}/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {filteredTodolistTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTodolistTasks.map((task: TasksType) => {


                        return (
                            <li key={task.id} className={task.isDone ? "task-done" : "task"}>

                                <Checkbox checked={task.isDone}
                                          onChange={(event) => changeTaskStatus(todolistId, task.id, event.currentTarget.checked)}
                                />

                                <EditableSpan globalTitle={task.title}
                                              callback={(newTitle) => updateTaskHandler(task.id, newTitle)}
                                />

                                <IconButton aria-label="delete" size="small"
                                            onClick={() => removeTaskHandler(todolistId, task.id)}>
                                    <DeleteIcon fontSize={"small"} style={{color: '#B00909FF'}}/>
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>

                <ButtonGroup aria-label="Basic button group" size={"small"} style={{padding: '0 0 0 29px'}}>
                    <Button color='primary'
                            variant={filter === 'all' ? 'contained' : 'outlined'}
                            onClick={onAllClickHandler}>All</Button>
                    <Button color='warning'
                            variant={filter === 'active' ? 'contained' : 'outlined'}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button color='success'
                            variant={filter === 'completed' ? 'contained' : 'outlined'}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};
