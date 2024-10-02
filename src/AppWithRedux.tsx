import './App.css';
import { FilterType, TasksType, Todolist } from "./Todolist";
import { v4 } from 'uuid';
import {Reducer, useReducer} from "react";
import { AddItemForm } from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
	ActionTasksType,
	addTaskAC,
	//addTodolistTasksAC,
	changeTaskStatusAC,
	removeTaskAC,
	tasksReducer,
	updateTaskTitleAC
} from "./state/tasks-reducer";
import {
	ActionTodolistsType,
	addTodolistAC,
	changeTodolistFilterAC,
	removeTodolistAC,
	todolistsReducer,
	updateTodolistTitleAC
} from "./state/todolists-reducer";
import {ActionModeType, changeModeAC, changeModeReducer} from "./state/changeMode-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./app/store";

export type ThemeModeType = 'dark' | 'light'

export type  TodolistsType = { id: string, title: string, filter: FilterType }
// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete

export type TasksStateType = {
	[key: string]: TasksType[]
}

function AppWithRedux() {

	let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)
	/*let [themeMode, dispatchThemeMode] = useReducer<Reducer<ThemeMode, ActionModeType>>(changeModeReducer, 'light')*/

	let todolistID1 = v4()
	let todolistID2 = v4()

	let todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)

	/*let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistsType[], ActionTodolistsType>>(todolistsReducer, [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])*/

	let tasks = useSelector<RootStateType,TasksStateType>(state => state.tasks)

	/*let [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionTasksType>>(tasksReducer, {
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
	})*/

	const dispatch = useDispatch()

	const removeTask = (todolistId: string, taskId: string) => {
		//dispatchTasks(removeTaskAC(todolistId, taskId))
		dispatch(removeTaskAC(todolistId, taskId))
	}
	const addTask = (todolistId: string, title: string) => {
		dispatch(addTaskAC(todolistId, title))
	}
	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus))
	}
	const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskTitleAC(todolistId, taskId, title))
	}

	const removeTodolist = (todolistId: string) => {
		let action = removeTodolistAC(todolistId)
		dispatch(action)
		//dispatchTodolists(action)
		//dispatchTasks(action)
	}
	const addTodolist = (title: string) => {
		//const newTodolistId = v4();
		let action = addTodolistAC(title)
		dispatch(action)
		//dispatchTodolists(action)
		//dispatchTasks(action)
	}
	const changeTodolistFilter = (todolistId: string, filteredTasks: FilterType) => {
		dispatch(changeTodolistFilterAC(todolistId, filteredTasks))
	}
	const updateTodolistTitle = (todolistId: string, title: string) => {
        dispatch(updateTodolistTitleAC(todolistId, title))
	}

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	})
	const changeModeHandler = () => {
		dispatch(changeModeAC(themeMode))
	}

	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<Grid item>
			<div className="App">
				<AppBar>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton color="inherit">
							<MenuIcon />
						</IconButton>
						<div>
							<Button color="inherit">Login</Button>
							<Button color="inherit">Logout</Button>
							<Button color="inherit">Faq</Button>
							<Switch color={'default'} onChange={changeModeHandler} />
						</div>
					</Toolbar>
				</AppBar>
				<Container fixed>
					<Grid container style={{ padding: '10px', margin: '70px 0 0 0' }}>
						<AddItemForm addItem={addTodolist} />
					</Grid>
					<Grid container spacing={3}>
						{todolists.map((el) => {

							return <Grid item key={el.id}>
								<Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
									<Todolist
										key={el.id} // для VirtualDOM
										todolistId={el.id}
										title={el.title}
										tasks={tasks[el.id]|| []}
										removeTask={removeTask}
										changeTodolistFilter={changeTodolistFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										removeTodolist={removeTodolist}
										updateTaskTitle={updateTaskTitle}
										updateTodolistTitle={updateTodolistTitle}
										filter={el.filter}
									/>
								</Paper>
							</Grid>
						})}
					</Grid>
				</Container>
			</div>
		</Grid>
	</ThemeProvider>
}

export default AppWithRedux;
