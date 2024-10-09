import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {changeTodolistFilterAC, FilterType, TodolistsType} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";


type FilterTasksButtonsType = {
    todolist: TodolistsType
}
export const FilterTasksButtons = ({todolist}: FilterTasksButtonsType) => {

    const {id, filter} = todolist

    const dispatch = useDispatch()

    const filterTaskHandler = (todolistId: string, filteredTasks: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filteredTasks))
    }

    const onAllClickHandler = () => filterTaskHandler(id, 'all')
    const onActiveClickHandler = () => filterTaskHandler(id, 'active')
    const onCompletedClickHandler = () => filterTaskHandler(id, 'completed')

    return (
        <>
            <ButtonGroup aria-label="Basic button group" size={"small"} style={{padding: '0 0 0 29px'}}>
                <Button color='primary'
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color='warning'
                        variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color='success'
                        variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>
        </>
    );
};