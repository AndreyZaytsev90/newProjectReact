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
	todolistId: string,
	title: string,
	tasks: Array<TasksType>,
	removeTask: (taskId: string) => void
	changeTodolistFilter: (todolistId: string, filteredTasks: FilterType) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean) => void
	filter: FilterType
}


export const Todolist = ({
	todolistId,
	title,
	tasks,
	removeTask,
	changeTodolistFilter,
	addTask,
	changeTaskStatus,
	filter
}: TodolistType) => {
	let [taskTitle, setTaskTitle] = useState<string>('')
	let [disabled, setDisabled] = useState<boolean>(true)
	let [inputError, setInputError] = useState<boolean>(false)
	/*const inputRef = useRef<HTMLInputElement>(null)*/

	const filteredTodolistTasks: Array<TasksType> =
		(filter === "active")
			? tasks.filter(task => !task.isDone)
			: (filter === "completed")
				? tasks.filter(task => task.isDone)
				: tasks

	const removeTaskHandler = (id: string) => {
		removeTask(id)
	}
	const filterTaskHandler = (todolistId: string, filteredTasks: FilterType) => {
		changeTodolistFilter(todolistId, filteredTasks)
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true)
		setTaskTitle(e.currentTarget.value)
		inputError && setInputError(false)
	}
	const addTaskHandler = () => {
		if (taskTitle.trim()) {
			addTask(taskTitle.trim())
			setDisabled(true)
			setInputError(false)
		} else {
			setInputError(true)
		}
		setTaskTitle('')
	}
	const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && taskTitle) {
			addTaskHandler()
		}
	}

	/*  const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
			const newStatusValue = event.currentTarget.checked
			changeTaskStatus(taskId, newStatusValue)
		}*/

	const onAllClickHandler = () => filterTaskHandler(todolistId, 'all')
	const onActiveClickHandler = () => filterTaskHandler(todolistId, 'active')
	const onCompletedClickHandler = () => filterTaskHandler(todolistId, 'completed')

	return (
		<div className="todolist">
			<h3>{title}</h3>
			<div>
				<input
					/*ref={inputRef} */
					onChange={onChangeHandler}
					value={taskTitle}
					onKeyUp={onKeyUpHandler}
					className={inputError ? "error" : ''}
				/>
				<Button name="+" callback={addTaskHandler} isDisabled={disabled} />
				{inputError && <div className="error-message">Title is required!</div>}
			</div>
			{filteredTodolistTasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{filteredTodolistTasks.map((task: TasksType) => (
						<li key={task.id} className={task.isDone ? "task-done" : "task"}>
							<input
								type="checkbox" checked={task.isDone}
								onChange={(event) => changeTaskStatus(task.id, event.currentTarget.checked)} />
							<span>{task.title}</span>
							<Button name="X" callback={() => removeTaskHandler(task.id)} />
						</li>
					))}
				</ul>
			)}
			<div>
				<Button
					className={filter === 'all' ? 'btn-active' : 'btn'}
					name="All"
					callback={onAllClickHandler} />
				<Button
					className={filter === 'active' ? 'btn-active' : 'btn'}
					name="Active"
					callback={onActiveClickHandler} />
				<Button
					className={filter === 'completed' ? 'btn-active' : 'btn'}
					name="Completed"
					callback={onCompletedClickHandler} />
			</div>
		</div>
	);
};
