import {AddItemForm} from "common/components"
import {addTaskAC, addTaskTC} from "../../../model/tasks-reducer"
import {DomainTodolist} from "../../../model/todolists-reducer"
import {TodolistTitle} from "../TodolistTitle/TodolistTitle"
import {Tasks} from "../Tasks/Tasks"
import {FilterTasksButtons} from "../FilterTasksButtons/FilterTasksButtons"
import {useAppDispatch} from "common/hooks"

type TodolistWithReduxType = {
  todolist: DomainTodolist
}

export const TodolistWithRedux = ({ todolist }: TodolistWithReduxType) => {
  const { id , entityStatus} = todolist
  const dispatch = useAppDispatch()

  const addTaskHandler = (newTitle: string) => {
    dispatch(addTaskTC({todolistId: id, title:newTitle}))
  }

  return (
    <div className="todolist">
      <div className={"todolist-title-container"}>
        <TodolistTitle todolist={todolist} />
      </div>
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
