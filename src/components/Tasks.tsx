import {changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC} from "../state/tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistsType} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../app/store";

type TasksType = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: TasksType) => {

    const {id, filter} = todolist

    let tasks = useSelector<RootStateType,TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id, taskId, newTitle))
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

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
        </>
    );
};

