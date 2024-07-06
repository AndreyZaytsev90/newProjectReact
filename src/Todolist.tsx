import './App.css';
import { Button } from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export type FilterType = "all" | "active" | "completed"

export interface TasksType {
  id: string,
  title: string,
  isDone: boolean
}

interface TodolistType {
  title: string,
  tasks: Array<TasksType>,
  removeTask: (taskId: string) => void
  changeTodolistFilter: (filteredTasks: FilterType) => void
  addTask: (title: string) => void
}


export const Todolist = ({ title, tasks, removeTask, changeTodolistFilter, addTask }: TodolistType) => {
  let [taskTitle, setTaskTitle] = useState<string>('')
  let [disabled, setDisabled] = useState<boolean>(true)
  /*const inputRef = useRef<HTMLInputElement>(null)*/

  const removeTaskHandler = (id: string) => {
    removeTask(id)
  }
  const filterTaskHandler = (filteredTasks: FilterType) => {
    changeTodolistFilter(filteredTasks)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true)
    setTaskTitle(e.currentTarget.value)
  }
  const addTaskHandler = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle.trim())
      setTaskTitle('')
      setDisabled(true)
    }
  }
  const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskTitle) {
      addTaskHandler()
    }
  }

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          /*ref={inputRef} */
          onChange={onChangeHandler}
          value={taskTitle}
          onKeyUp={onKeyUpHandler}
        />
        <Button name="+" callback={addTaskHandler} isDisabled={disabled} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task: TasksType) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button name="X" callback={() => removeTaskHandler(task.id)} />
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button name="All" callback={() => filterTaskHandler('all')} />
        <Button name="Active" callback={() => filterTaskHandler('active')} />
        <Button name="Completed" callback={() => filterTaskHandler('completed')} />
      </div>
    </div>
  );
};
