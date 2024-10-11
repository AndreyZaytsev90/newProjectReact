import {TaskType} from "../../../model/tasks-reducer";
import {TodolistsType} from "../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";

type TasksType = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: TasksType) => {

    const {id, filter} = todolist

    /*let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])*/
    let tasks = useAppSelector(state => state.tasks[id])

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
                        return <Task key={task.id} todolist={todolist} task={task}/>
                    })}
                </ul>
            )}
        </>
    );
};

