import {TaskType} from "../../../model/tasks-reducer";
import {TodolistsType} from "../../../model/todolists-reducer";
import {Task} from "./Task";
import {selectTasks} from "../../../model/tasksSelectors";
import {useAppSelector} from "common/hooks";

type TasksType = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: TasksType) => {

    const {id, filter} = todolist

    /*let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])*/
    let tasks = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[id]

    const filteredTodolistTasks: Array<TaskType> =
        (filter === "active")
            ? allTodolistTasks.filter(task => !task.isDone)
            : (filter === "completed")
                ? allTodolistTasks.filter(task => task.isDone)
                : allTodolistTasks


    return (
        <>
            {filteredTodolistTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTodolistTasks.map((task: TaskType) => {
                        return <Task key={task.id} todolist={todolist} task={task}/>
                    })}
                </ul>
            )}
        </>
    );
};

