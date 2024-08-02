import './App.css';
import { FilterType, TasksType, Todolist } from "./Todolist";
import { v4 } from 'uuid';
import { useState } from "react";
import {AddItemForm} from "./AddItemForm";

type TodolistsType = { id: string, title: string, filter: FilterType }
// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete

export type TasksStateType = {
	[key: string]: TasksType[]
}

function App() {

	let todolistID1 = v4()
	let todolistID2 = v4()

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v4(), title: "HTML&CSS", isDone: true },
			{ id: v4(), title: "JS", isDone: true },
			{ id: v4(), title: "ReactJS", isDone: false },
			{ id: v4(), title: "Rest API", isDone: false },
			{ id: v4(), title: "GraphQL", isDone: false },
		],
		[todolistID2]: [
			{ id: v4(), title: "HTML&CSS2", isDone: true },
			{ id: v4(), title: "JS2", isDone: true },
			{ id: v4(), title: "ReactJS2", isDone: false },
			{ id: v4(), title: "Rest API2", isDone: false },
			{ id: v4(), title: "GraphQL2", isDone: false },
		]
	})
	// Локальный стэйт для хранения информации по фильтрации
	//const [filter, setFilter] = useState<FilterType>("all") - у каждого тудулиста свой фильтр
	// let [tasks, setTasks] = useState<Array<TasksType>>([
	// 	{ id: v4(), title: "HTML", isDone: true },
	// 	{ id: v4(), title: "CSS", isDone: true },
	// 	{ id: v4(), title: "ES6/TS", isDone: false },
	// 	{ id: v4(), title: "REACT", isDone: false },
	// ])

	/* let [newTask, setNewTask] = useState<TasksType>()*/

	// const filteredTasks: Array<TasksType> =
	//   (filter === "active")
	//     ? tasks.filter(task => !task.isDone)
	//     : (filter === "completed")
	//       ? tasks.filter(task => task.isDone)
	//       : tasks
	// console.log(todolists) // массив с 2мя объектами
	// console.log(...todolists) // Деструктуризация. Видим просто 2 объекта, без массива (без ящика)
	// console.log([...todolists]) // копия массива todolists

	const removeTask = (todolistId: string, taskId: string) => {
		// tasks = tasks.filter(t => t.id !== taskId)
		// setTasks(tasks)
		//console.log(todolistId, taskId)
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId) })
	}

	const addTask = (todolistId: string, title: string) => {
		let newTask: TasksType = { id: v4(), title, isDone: false }
		// setTasks([newTask, ...tasks])
		setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
	}

	const changeTodolistFilter = (todolistId: string, filteredTasks: FilterType) => {
		//setFilter(filteredTasks)
		// этот код не работает с редаксом
		/* const currentTodolist = todolists.find((el) => el.id === todolistId)
		 if (currentTodolist) {
				 currentTodolist.filter = filteredTasks
				 setTodolists([...todolists])
		 }*/
		setTodolists(todolists.map((el) => el.id === todolistId ? { ...el, filter: filteredTasks } : el))
	}

	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		// { ...t, isDone: taskStatus } - спрэд оператор убивает типизацию этого объекта и его можно изменять как угодно. Это косяк TS
		// const tasksWithNewStatus = tasks.map((t) => t.id === taskId ? { ...t, isDone: taskStatus } : t)
		// setTasks(tasksWithNewStatus)
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? { ...t, isDone: taskStatus } : t) })
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter((t) => t.id !== todolistId))
		delete tasks[todolistId]
	}

	const addTodolist = (title: string) => {
		const todolistId = v4()
		const newTodolist: TodolistsType = { id: todolistId, title: title, filter: 'all' }
		setTodolists([newTodolist, ...todolists])
		setTasks({ ...tasks, [todolistId]: [] })
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((el) => {

				/*const filteredTasks: Array<TasksType> =
						(el.filter === "active")
								? tasks.filter(task => !task.isDone)
								: (el.filter === "completed")
										? tasks.filter(task => task.isDone)
										: tasks*/

				return (
					<Todolist
						key={el.id} // для VirtualDOM
						todolistId={el.id}
						title={el.title}
						tasks={tasks[el.id]}
						removeTask={removeTask}
						changeTodolistFilter={changeTodolistFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						removeTodolist={removeTodolist}
						filter={el.filter}
					/>
				)
			})}
		</div>
	);
}

export default App;
