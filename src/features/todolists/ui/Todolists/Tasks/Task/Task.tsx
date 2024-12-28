import {changeTaskTC, removeTaskTC,} from "../../../../model/tasks-reducer"
import Checkbox from "@mui/material/Checkbox"
//import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {DomainTodolist} from "../../../../model/todolists-reducer"
import {ChangeEvent} from "react"
//import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
// в tsconfig.json добавили baseurl относительно src для сокращения импорта
//import {EditableSpan} from "common/components/EditableSpan";
import {useAppDispatch} from "common/hooks"
//сократили импорт в файле components/index.ts
import {EditableSpan} from "common/components"
import {DomainTask} from "../../../../api/tasksApi.types";
import {TaskStatus} from "../../../../lib/enums";

type TaskComponentType = {
    task: DomainTask
    todolist: DomainTodolist
    disabled?: boolean
}
export const Task = ({task, todolist, disabled}: TaskComponentType) => {
    const dispatch = useAppDispatch()
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        //dispatch(changeTaskStatusTC({todolistId: todolist.id, taskId: task.id, taskStatus: newTaskStatus}))
        //console.log("New status:", newStatus); // Логирование нового статуса
        dispatch(changeTaskTC({task, newStatus}))
    }

    const changeTaskTitleHandler = (newTitle: string) => {
       // dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
       // dispatch(changeTaskTitleTC({task, todolistId: todolist.id, title: newTitle}))
        dispatch(changeTaskTC({task, newTitle}))
    }

    const removeTaskHandler = () => {
        //dispatch(removeTaskAC(todolist.id, task.id))
        dispatch(removeTaskTC({todolistId: todolist.id, taskId: task.id}))
    }

    return (
        <li key={task.id} className={task.status ? "task-done" : "task"}>
            <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={disabled}/>
            <EditableSpan title={task.title} callback={changeTaskTitleHandler} disabled={disabled}/>
            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler} disabled={disabled}>
                <DeleteIcon fontSize={"small"} style={disabled? {color: "#B0090980"}: {color: "#B00909F0"}}/>
            </IconButton>
        </li>
    )
}
