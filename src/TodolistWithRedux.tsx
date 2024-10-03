import './App.css';
import Button from '@mui/material/Button';
//import { ChangeEvent, KeyboardEvent, useState } from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from "@mui/material/Checkbox";
import {TasksStateType, TodolistsType} from "./AppWithRedux";
import {RootStateType} from "./app/store";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, removeTodolistAC, updateTodolistTitleAC} from "./state/todolists-reducer";

export type FilterType = "all" | "active" | "completed"

export interface TasksType {
    id: string,
    title: string,
    isDone: boolean
}

interface TodolistWithReduxType {
    todolist: TodolistsType
}


export const TodolistWithRedux = ({todolist}: TodolistWithReduxType) => {

    const {id, title , filter} = todolist

    let tasks = useSelector<RootStateType,TasksType[]>(state => state.tasks[id])

    let dispatch = useDispatch()


    const filteredTodolistTasks: Array<TasksType> =
        (filter === "active")
            ? tasks.filter(task => !task.isDone)
            : (filter === "completed")
                ? tasks.filter(task => task.isDone)
                : tasks

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const filterTaskHandler = (todolistId: string, filteredTasks: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filteredTasks))
    }

    const onAllClickHandler = () => filterTaskHandler(id, 'all')
    const onActiveClickHandler = () => filterTaskHandler(id, 'active')
    const onCompletedClickHandler = () => filterTaskHandler(id, 'completed')

    const removeTodolistHandler = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTaskHandler = (title: string) => {
        //console.log("todolistId", todolistId)
        dispatch(addTaskAC(id, title))
    }


    const updateTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id, taskId, newTitle))
    }

    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistTitleAC(id, newTitle))
    }


    return (
        <div className="todolist">
            <div className={'todolist-title-container'}>

                <h3><EditableSpan globalTitle={title} callback={updateTodolistHandler}/></h3>

                <IconButton aria-label="delete" size="small" onClick={() => removeTodolistHandler(id)}>
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
                                          onChange={(event) => dispatch(changeTaskStatusAC(id, task.id, event.currentTarget.checked))}
                                />

                                <EditableSpan globalTitle={task.title}
                                              callback={(newTitle) => updateTaskHandler(task.id, newTitle)}
                                />

                                <IconButton aria-label="delete" size="small"
                                            onClick={() => removeTaskHandler(id, task.id)}>
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
