import {EditableSpan} from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {
    /*changeTodolistTC,*/
    DomainTodolist,
    removeTodolistTC, updateTodolistTitleTC,
    /*updateTodolistTitleTC*/
} from "../../../model/todolists-reducer"
import styles from "./TodolistTitle.module.css"
import {useAppDispatch} from "common/hooks"

type TodolistTitleType = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: TodolistTitleType) => {
    const {id, title, entityStatus} = todolist

    console.log(todolist)

    const dispatch = useAppDispatch()
    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistTitleTC({id, newTitle}))

        ////Тест с общей санкой
        //dispatch(changeTodolistTC({todolist, newTitle}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC({id, entityStatus}))

        ////Тест с общей санкой и экшнм внутри
        //dispatch(removeTodolistTC({todolist, entityStatus}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan title={title} callback={updateTodolistHandler}/>
            </h3>

            <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
