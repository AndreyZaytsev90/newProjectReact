import {fetchTasksTC} from "../../../model/tasks-reducer"
import { DomainTodolist } from "../../../model/todolists-reducer"
import { Task } from "./Task"
import { selectTasks } from "../../../model/tasksSelectors"
import { useAppSelector } from "common/hooks"
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {TaskStatus} from "../../../lib/enums";
import {DomainTask} from "../../../api/tasksApi.types";

type TasksType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: TasksType) => {
  const { id, filter } = todolist

  /*let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])*/
  let tasks = useAppSelector(selectTasks)

  const dispatch = useDispatch()
  useEffect(()=> {
    // @ts-ignore
    dispatch(fetchTasksTC(id))
  }, [])

  const allTodolistTasks = tasks[id]

  const filteredTodolistTasks: Array<DomainTask> =
    filter === "active"
      ? allTodolistTasks.filter((task) => task.status === TaskStatus.New)
      : filter === "completed"
        ? allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
        : allTodolistTasks

  return (
    <>
      {filteredTodolistTasks && filteredTodolistTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {/*аналогично filteredTodolistTasks && */}
          {filteredTodolistTasks?.map((task: DomainTask) => {
            return <Task key={task.id} todolist={todolist} task={task} />
          })}
        </ul>
      )}
    </>
  )
}
