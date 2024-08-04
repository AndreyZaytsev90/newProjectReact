import './App.css';
import { Button } from "./Button";
//import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from './EditableSpan';

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
	removeTask: (todolistId: string, taskId: string) => void
	changeTodolistFilter: (todolistId: string, filteredTasks: FilterType) => void
	addTask: (todolistId: string, title: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
	removeTodolist: (todolistId: string) => void
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
	removeTodolist,
	filter
}: TodolistType) => {
	/* let [taskTitle, setTaskTitle] = useState<string>('')
	 let [disabled, setDisabled] = useState<boolean>(true)
	 let [inputError, setInputError] = useState<boolean>(false)*/
	/*const inputRef = useRef<HTMLInputElement>(null)*/

	//let [taskTitle, setTaskTitle] = useState<string>('')

	const filteredTodolistTasks: Array<TasksType> =
		(filter === "active")
			? tasks.filter(task => !task.isDone)
			: (filter === "completed")
				? tasks.filter(task => task.isDone)
				: tasks

	const removeTaskHandler = (todolistId: string, taskId: string) => {
		removeTask(todolistId, taskId)
	}
	const filterTaskHandler = (todolistId: string, filteredTasks: FilterType) => {
		changeTodolistFilter(todolistId, filteredTasks)
	}
	/*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true)
			setTaskTitle(e.currentTarget.value)
			inputError && setInputError(false)
	}
	const addTaskHandler = () => {
			if (taskTitle.trim()) {
					addTask(todolistId, taskTitle.trim())
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
	}*/

	/*  const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
					const newStatusValue = event.currentTarget.checked
					changeTaskStatus(taskId, newStatusValue)
			}*/

	const onAllClickHandler = () => filterTaskHandler(todolistId, 'all')
	const onActiveClickHandler = () => filterTaskHandler(todolistId, 'active')
	const onCompletedClickHandler = () => filterTaskHandler(todolistId, 'completed')

	const removeTodolistHandler = (todolistId: string) => {
		removeTodolist(todolistId)
	}

	const addTaskHandler = (title: string) => {
		addTask(todolistId, title)
	}

	return (
		<div className="todolist">
			<div className={'todolist-title-container'}>
				<h3>{title}</h3>
				<Button name={'x'} callback={() => removeTodolistHandler(todolistId)} />
			</div>
			<div>
				{/* <input
                    onChange={onChangeHandler}
                    value={taskTitle}
                    onKeyUp={onKeyUpHandler}
                    className={inputError ? "error" : ''}
                />
                <Button name="+" callback={addTaskHandler} isDisabled={disabled}/>
                {inputError && <div className="error-message">Title is required!</div>}*/}
				<AddItemForm addItem={addTaskHandler} />
			</div>
			{filteredTodolistTasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{filteredTodolistTasks.map((task: TasksType) => (
						<li key={task.id} className={task.isDone ? "task-done" : "task"}>
							<input
								type="checkbox" checked={task.isDone}
								onChange={(event) => changeTaskStatus(todolistId, task.id, event.currentTarget.checked)} />
							{/* <span>{task.title}</span> */}
							<EditableSpan globalTitle={task.title} />
							<Button name="X" callback={() => removeTaskHandler(todolistId, task.id)} />
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
