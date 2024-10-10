import {changeTaskStatusAC, removeTaskAC, TaskType, changeTaskTitleAC} from "../../../../model/tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {TodolistsType} from "../../../../model/todolists-reducer";
import {ChangeEvent} from "react";

type TaskComponentType = {
    task: TaskType
    todolist: TodolistsType
}
export const Task = ({task, todolist}:TaskComponentType) => {

    const dispatch = useDispatch()

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>)=> {
        const newTaskStatus = event.currentTarget.checked
        dispatch(changeTaskStatusAC(todolist.id, task.id, newTaskStatus))
    }

    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
    }

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolist.id, task.id))
    }

    return (
        <li key={task.id} className={task.isDone ? "task-done" : "task"}>
            <Checkbox checked={task.isDone}
                      onChange={changeTaskStatusHandler}
            />
            <EditableSpan globalTitle={task.title}
                          callback={changeTaskTitleHandler}
            />
            <IconButton aria-label="delete" size="small"
                        onClick={removeTaskHandler}>
                <DeleteIcon fontSize={"small"} style={{color: '#B00909FF'}}/>
            </IconButton>
        </li>
    );
};