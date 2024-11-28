import {EditableSpan} from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {
    DomainTodolist,
    removeTodolistAC,
    removeTodolistTC,
    updateTodolistTitleAC, updateTodolistTitleTC
} from "../../../model/todolists-reducer"
import styles from "./TodolistTitle.module.css"
import {useAppDispatch} from "common/hooks"

type TodolistTitleType = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: TodolistTitleType) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()
  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({id, title}))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC({id}))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan title={title} callback={updateTodolistHandler} />
      </h3>

      <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
        <DeleteIcon style={{ color: "#B00909FF" }} />
      </IconButton>
    </div>
  )
}
