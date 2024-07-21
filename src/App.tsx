import './App.css';
import { FilterType, TasksType, Todolist } from "./Todolist";
import { v4 } from 'uuid';
import { useState } from "react";

type TodolistsType = { id: string, title: string, filter: FilterType }
// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete
function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v4(), title: "HTML", isDone: true },
    { id: v4(), title: "CSS", isDone: true },
    { id: v4(), title: "ES6/TS", isDone: false },
    { id: v4(), title: "REACT", isDone: false },
  ])

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: v4(), title: 'What to learn', filter: 'all' },
    { id: v4(), title: 'What to buy', filter: 'all' },
  ])
  // Локальный стэйт для хранения информации по фильтрации
  //const [filter, setFilter] = useState<FilterType>("all") - у каждого дутулиста свой фильтр

  /* let [newTask, setNewTask] = useState<TasksType>()*/

  // const filteredTasks: Array<TasksType> =
  //   (filter === "active")
  //     ? tasks.filter(task => !task.isDone)
  //     : (filter === "completed")
  //       ? tasks.filter(task => task.isDone)
  //       : tasks

  const removeTask = (taskId: string) => {
    tasks = tasks.filter(t => t.id !== taskId)
    setTasks(tasks)
  }

  const changeTodolistFilter = (todolistId: string, filteredTasks: FilterType) => {
    //setFilter(filteredTasks)
    const currentTodolist = todolists.find((el) => el.id === todolistId)
    if (currentTodolist) {
      currentTodolist.filter = filteredTasks
      setTodolists([...todolists])
    }
  }

  const addTask = (title: string) => {
    let newTask: TasksType = { id: v4(), title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    // { ...t, isDone: taskStatus } - спрэд оператор убивает типизацию этого объекта и его можно изменять как угодно. Это косяк TS
    const tasksWithNewStatus = tasks.map((t) => t.id === taskId ? { ...t, isDone: taskStatus } : t)
    setTasks(tasksWithNewStatus)
  }


  return (
    <div className="App">
      {todolists.map((el) => {

        const filteredTasks: Array<TasksType> =
          (el.filter === "active")
            ? tasks.filter(task => !task.isDone)
            : (el.filter === "completed")
              ? tasks.filter(task => task.isDone)
              : tasks


        return (
          <Todolist
            key={el.id} // для VirtualDOM
            todolistId={el.id}
            title={el.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeTodolistFilter={changeTodolistFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={el.filter}
          />
        )
      })}
    </div>
  );
}

export default App;
