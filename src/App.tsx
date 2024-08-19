import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {addTaskAC, removeTaskAC, tasksReducer} from "./reducers/tasksReducer";
import {changeFilterAC, filterReducer} from "./reducers/filterReducer";
/*
* Рано или поздно мы столкнемся с тем, что наш проект необходимо будет масштабировать.
* Структура нашего проекта сейчас для этого абсолютно не годится
* Оказывается, внутри проект работает совершенно по другому.
* Сейчас посмотрим что такое редьюсер(функция)*/
export type FilterValuesType = "all" | "active" | "completed";

function App() {

   /* let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);*/

    /*
    * сетает (вызывают функцию set.. из useState только школота)
    * нормальные разрабы используют dispatch
    * */

    let [tasks, dispatchTasks] = useReducer(tasksReducer,[ // useReducer - для больших(не локальных) state (может использоваться вместе с Redux)
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        dispatchTasks(removeTaskAC(id))
       /* let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(title: string) {
        dispatchTasks(addTaskAC(title))
      /*  let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
    }

   /* let [filter, setFilter] = useState<FilterValuesType>("all");*/

    let [filter, dispatchFilter] = useReducer(filterReducer, 'all');

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        //setFilter(value);
        dispatchFilter(changeFilterAC(value))
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default App;
