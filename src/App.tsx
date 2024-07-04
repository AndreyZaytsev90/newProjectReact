import './App.css';
import {TasksType, Todolist} from "./Todolist";
import { v4 as uuidv4 } from 'uuid';
import {useState} from "react";

function App() {

    let [tasks , setTasks] = useState<Array<TasksType>>([
        {id: uuidv4(), title: "HTML", isDone: true },
        {id: uuidv4(), title: "CSS", isDone: true },
        {id: uuidv4(), title: "ES6/TS", isDone: false },
    ])

    const removeTask = (taskId: string) => {
        console.log("deleted task")
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
           {/* <Todolist title="What to buy" tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
