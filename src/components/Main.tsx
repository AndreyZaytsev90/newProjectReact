import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm";
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "../TodolistWithRedux";
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../app/store";
import {TodolistsType} from "../app/AppWithRedux";
import {addTodolistAC} from "../state/todolists-reducer";

export const Main = () => {

    let todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    return (
        <Container fixed>
            <Grid container style={{padding: '10px', margin: '70px 0 0 0'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((el) => {

                    return <Grid item key={el.id}>
                        <Paper elevation={3} style={{padding: '10px', margin: '10px'}}>
                            {/*<Todolist
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
									/>*/}
                            <TodolistWithRedux todolist={el}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>
    );
};