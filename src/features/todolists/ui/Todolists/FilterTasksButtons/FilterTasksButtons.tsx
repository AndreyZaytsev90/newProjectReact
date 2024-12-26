import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import {
  /*changeTodolistFilterAC, */
  FilterType,
  DomainTodolist, changeTodolistFilterAC,
  /*changeTodolistTC*/
} from "../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type FilterTasksButtonsType = {
  todolist: DomainTodolist
}
export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsType) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filteredTasks: FilterType) => {
    dispatch(changeTodolistFilterAC(id, filteredTasks))

    ////Тест с общей санкой
    //dispatch(changeTodolistTC({todolist, filteredTasks}))
  }

  const onAllClickHandler = () => changeTodolistFilterHandler("all")
  const onActiveClickHandler = () => changeTodolistFilterHandler("active")
  const onCompletedClickHandler = () => changeTodolistFilterHandler("completed")

  return (
    <>
      <ButtonGroup aria-label="Basic button group" size={"small"} style={{ padding: "0 0 0 29px" }}>
        <Button color="primary" variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>
          All
        </Button>
        <Button color="warning" variant={filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button
          color="success"
          variant={filter === "completed" ? "contained" : "outlined"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </ButtonGroup>
    </>
  )
}
