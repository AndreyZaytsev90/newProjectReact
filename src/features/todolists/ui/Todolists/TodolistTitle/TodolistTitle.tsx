import {EditableSpan} from "../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTodolistAC, TodolistsType, updateTodolistTitleAC} from "../../../model/todolists-reducer";
import styles from "./TodolistTitle.module.css"
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type TodolistTitleType = {
    todolist: TodolistsType
}
export const TodolistTitle = ({todolist}: TodolistTitleType) => {

    const {id, title} = todolist

    const dispatch = useAppDispatch()
    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistTitleAC(id, newTitle))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    return (
        <div className={styles.container}>
            <h3><EditableSpan globalTitle={title} callback={updateTodolistHandler}/></h3>

            <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                <DeleteIcon style={{color: '#B00909FF'}}/>
            </IconButton>
        </div>
    );
};