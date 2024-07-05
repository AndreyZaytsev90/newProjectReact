import './App.css';
import {Button} from "./Button";

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
}


export const Todolist = ({title, tasks, removeTask, changeTodolistFilter}: TodolistType) => {
    console.log(tasks)

    const removeTaskHandler = (id: string) => {
        return () => removeTask(id)
    }

    const filterTaskHandler = (filteredTasks: FilterType) => {
        return () => changeTodolistFilter(filteredTasks)
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name="+"/>
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