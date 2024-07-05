import './App.css';
import {Button} from "./Button";
import {useRef, useState} from "react";

export type FilterType = "all" | "active" | "completed"

export interface TasksType {
    id: string,
    title: string,
    isDone: boolean
}

interface TodolistType {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filteredTasks: FilterType) => void
    addTask: (title: string) => void
}


export const Todolist = ({title, tasks, removeTask, changeTodolistFilter, addTask}: TodolistType) => {
    const [taskTitle, setTaskTitle] = useState()

    const removeTaskHandler = (id: string) => {
        return () => removeTask(id)
    }

    const filterTaskHandler = (filteredTasks: FilterType) => {
        return () => changeTodolistFilter(filteredTasks)
    }

    const inputRef = useRef<HTMLInputElement>(null)
    const addTaskHandler = () => {
        if (inputRef.current){
            addTask(inputRef.current.value)
            inputRef.current.value = ""
        }
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button name="+" callback={addTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map((task: TasksType) => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button name="X" callback={removeTaskHandler(task.id)}/>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <Button name="All" callback={filterTaskHandler('all')}/>
                <Button name="Active" callback={filterTaskHandler('active')}/>
                <Button name="Completed" callback={filterTaskHandler('completed')}/>
            </div>
        </div>
    );
};