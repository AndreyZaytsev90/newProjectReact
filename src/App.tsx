import './App.css';
import {FilterType, TasksType, Todolist} from "./Todolist";
import {v4} from 'uuid';
import {useState} from "react";


// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete
function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v4(), title: "HTML", isDone: true},
        {id: v4(), title: "CSS", isDone: true},
        {id: v4(), title: "ES6/TS", isDone: false},
        {id: v4(), title: "REACT", isDone: false},
    ])
    // Локальный стэйт для хранения информации по фильтрации
    const [filter, setFilter] = useState<FilterType>("all")

    /* let [newTask, setNewTask] = useState<TasksType>()*/

    const filteredTasks: Array<TasksType> =
        (filter === "active")
            ? tasks.filter(task => !task.isDone)
            : (filter === "completed")
                ? tasks.filter(task => task.isDone)
                : tasks

    const removeTask = (taskId: string) => {
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks)
    }

    const changeTodolistFilter = (filteredTasks: FilterType) => {
        setFilter(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask: TasksType = {id: v4(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        // { ...t, isDone: taskStatus } - спрэд оператор убивает типизацию этого объекта и его можно изменять как угодно. Это косяк TS
        const tasksWithNewStatus = tasks.map((t) => t.id === taskId ? {...t, isDone: taskStatus} : t)
        setTasks(tasksWithNewStatus)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
            {/* <Todolist title="What to buy" tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
