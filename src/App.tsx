import './App.css';
import { FilterType, TasksType, Todolist } from "./Todolist";
import { v4 } from 'uuid';
import { useReducer } from "react";
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
	addTaskAC,
	addTodolistTasksAC,
	changeTaskStatusAC,
	removeTaskAC,
	tasksReducer,
	updateTaskTitleAC
} from "./state/tasks-reducer";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	removeTodolistAC,
	todolistsReducer,
	updateTodolistTitleAC
} from "./state/todolists-reducer";
import { changeModeAC, changeModeReducer } from "./state/changeMode-reducer";

export type ThemeMode = 'dark' | 'light'

export type TodolistsType = { id: string, title: string, filter: FilterType }
// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete

export type TasksStateType = {
	[key: string]: TasksType[]
}

function App() {

	//const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	let [themeMode, dispatchThemeMode] = useReducer(changeModeReducer, 'light')

	let todolistID1 = v4()
	let todolistID2 = v4()

	/* let [todolists, setTodolists] = useState<Array<TodolistsType>>([
			 {id: todolistID1, title: 'What to learn', filter: 'all'},
			 {id: todolistID2, title: 'What to buy', filter: 'all'},
	 ])*/

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	/*  let [tasks, setTasks] = useState<TasksStateType>({
				[todolistID1]: [
						{id: v4(), title: "HTML&CSS", isDone: true},
						{id: v4(), title: "JS", isDone: true},
						{id: v4(), title: "ReactJS", isDone: false},
						{id: v4(), title: "Rest API", isDone: false},
						{id: v4(), title: "GraphQL", isDone: false},
				],
				[todolistID2]: [
						{id: v4(), title: "HTML&CSS2", isDone: true},
						{id: v4(), title: "JS2", isDone: true},
						{id: v4(), title: "ReactJS2", isDone: false},
						{id: v4(), title: "Rest API2", isDone: false},
						{id: v4(), title: "GraphQL2", isDone: false},
				]
		})*/
	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

	const removeTask = (todolistId: string, taskId: string) => {
		dispatchTasks(removeTaskAC(todolistId, taskId))
	}
	const addTask = (todolistId: string, title: string) => {
		dispatchTasks(addTaskAC(todolistId, title))
	}
	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		dispatchTasks(changeTaskStatusAC(todolistId, taskId, taskStatus))
	}
	const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
		dispatchTasks(updateTaskTitleAC(todolistId, taskId, title))
	}

	const removeTodolist = (todolistId: string) => {
		dispatchTodolists(removeTodolistAC(todolistId))
		delete tasks[todolistId]
	}
	const addTodolist = (title: string) => {
		const newTodolistId = v4();
		dispatchTodolists(addTodolistAC(newTodolistId, title))
		dispatchTasks(addTodolistTasksAC(newTodolistId))
		/*  const todolistId = v4()
			const newTodolist: TodolistsType = {id: todolistId, title: title, filter: 'all'}
			setTodolists([newTodolist, ...todolists])
			setTasks({
					...tasks, [todolistId]: [
							{id: v4(), title: "HTML&CSS", isDone: false},
							{id: v4(), title: "JS", isDone: false},
					]
			})*/
	}
	const changeTodolistFilter = (todolistId: string, filteredTasks: FilterType) => {
		dispatchTodolists(changeTodolistFilterAC(todolistId, filteredTasks))
	}
	const updateTodolistTitle = (todolistId: string, title: string) => {
		dispatchTodolists(updateTodolistTitleAC(todolistId, title))
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
		dispatchThemeMode(changeModeAC(themeMode))
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

							return <Grid item>
								<Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
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

export default App;
