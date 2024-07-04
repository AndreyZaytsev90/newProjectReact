import './App.css';
import {Button} from "./Button";
import {JSX} from "react";

export interface TasksType {
    id: string,
    title: string,
    isDone: boolean
}

interface TodolistType {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void
}

export const Todolist = ({title, tasks, removeTask}: TodolistType) => {
    console.log(tasks)

    const listItems:Array<JSX.Element> = tasks.map((task:TasksType) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <Button name="X" callback={() => removeTask(task.id)}/>
        </li>
    ))

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name="+" callback={() => {
                }}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {listItems}
                </ul>
            )}
            <div>
                <Button name="All" callback={() => {
                }}/>
                <Button name="Active" callback={() => {
                }}/>
                <Button name="Completed" callback={() => {
                }}/>
            </div>
        </div>
    );
};