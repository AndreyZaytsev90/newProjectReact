import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTodolistAC, TodolistsType, updateTodolistTitleAC} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";


type TodolistTitleType = {
    todolist: TodolistsType
}
export const TodolistTitle = ({todolist}: TodolistTitleType) => {

    const {id, title} = todolist

    const dispatch = useDispatch()
    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistTitleAC(id, newTitle))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    return (
        <>
            <h3><EditableSpan globalTitle={title} callback={updateTodolistHandler}/></h3>

            <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                <DeleteIcon style={{color: '#B00909FF'}}/>
            </IconButton>
        </>
    );
};