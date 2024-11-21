import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../../../model/tasks-reducer"
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

type TaskComponentType = {
  task: TaskType
  todolist: DomainTodolist
}
export const Task = ({ task, todolist }: TaskComponentType) => {
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
      <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
      <EditableSpan title={task.title} callback={changeTaskTitleHandler} />
      <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
        <DeleteIcon fontSize={"small"} style={{ color: "#B00909FF" }} />
      </IconButton>
    </li>
  )
}
