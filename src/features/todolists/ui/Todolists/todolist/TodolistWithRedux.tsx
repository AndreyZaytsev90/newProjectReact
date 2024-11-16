import { AddItemForm } from "common/components"
import { addTaskAC } from "../../../model/tasks-reducer"
import { TodolistsType } from "../../../model/todolists-reducer"
import { TodolistTitle } from "../TodolistTitle/TodolistTitle"
import { Tasks } from "../Tasks/Tasks"
import { FilterTasksButtons } from "../FilterTasksButtons/FilterTasksButtons"
import { useAppDispatch } from "common/hooks"

type TodolistWithReduxType = {
  todolist: TodolistsType
}

export const TodolistWithRedux = ({ todolist }: TodolistWithReduxType) => {
  const { id } = todolist
  const dispatch = useAppDispatch()

  const addTaskHandler = (newTitle: string) => {
    dispatch(addTaskAC(id, newTitle))
  }

  return (
    <div className="todolist">
      <div className={"todolist-title-container"}>
        <TodolistTitle todolist={todolist} />
      </div>
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
