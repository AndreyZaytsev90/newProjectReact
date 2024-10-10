import {TaskType} from "../state/tasks-reducer";
import {TodolistsType} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {RootStateType} from "../app/store";
import {Task} from "./Task";

type TasksType = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: TasksType) => {

    const {id, filter} = todolist

    let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])

    const filteredTodolistTasks: Array<TaskType> =
        (filter === "active")
            ? tasks.filter(task => !task.isDone)
            : (filter === "completed")
                ? tasks.filter(task => task.isDone)
                : tasks


    return (
        <>
            {filteredTodolistTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTodolistTasks.map((task: TaskType) => {
                        return <Task key={task.id} task={task}/>
                    })}
                </ul>
            )}
        </>
    );
};

