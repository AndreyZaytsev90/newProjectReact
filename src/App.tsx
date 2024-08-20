import './App.css';
import {FilterType, TasksType, Todolist} from "./Todolist";
import {v4} from 'uuid';
import {useState} from "react";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

type ThemeMode = 'dark' | 'light'

type TodolistsType = { id: string, title: string, filter: FilterType }
// (C)-create
// (R)- read (filter, sort, search, pagination, view-mode)
// (U)- update
// (D) - delete

export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    let todolistID1 = v4()
    let todolistID2 = v4()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
    })

    const removeTask = (todolistId: string, taskId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask: TasksType = {id: v4(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTodolistFilter = (todolistId: string, filteredTasks: FilterType) => {

        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: filteredTasks} : el))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: taskStatus} : t)
        })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((t) => t.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todolistId = v4()
        const newTodolist: TodolistsType = {id: todolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [todolistId]: [
                {id: v4(), title: "HTML&CSS", isDone: false},
                {id: v4(), title: "JS", isDone: false},
            ]
        })
    }
    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((el) => el.id === taskId ? {...el, title} : el)
        })
    }
    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, title} : el))
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
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid item>
            <div className="App">
                <AppBar>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
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
                    <Grid container style={{padding: '10px', margin: '70px 0 0 0'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map((el) => {

                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px', margin: '10px'}}>
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
