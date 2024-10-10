import {changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC} from "../state/tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";

type TaskComponentType = {
    task: TaskType
}
export const Task = ({task}:TaskComponentType) => {

    const {id} = task

    const dispatch = useDispatch()

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id, taskId, newTitle))
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

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
    );
};