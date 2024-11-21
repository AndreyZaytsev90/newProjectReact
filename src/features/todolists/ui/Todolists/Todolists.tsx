import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistWithRedux} from "./todolist/TodolistWithRedux"
import {selectTodolists} from "../../model/todolistsSelectors"
import {useAppSelector} from "common/hooks"
import {useEffect} from "react";
import {todolistsApi} from "../../api/todolistsApi";
import {useDispatch} from "react-redux";
import {setTodolistsAC} from "../../model/todolists-reducer";

export const Todolists = () => {
    /*let todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)*/
    let todolists = useAppSelector(selectTodolists) //используем селектор

    let dispatch = useDispatch()

    useEffect(() => {
        todolistsApi.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
        })
    }, [])

    return (
        <>
            {todolists.map((el) => {
                return (
                    <Grid item key={el.id}>
                        <Paper elevation={3} style={{padding: "10px", margin: "10px"}}>
                            <TodolistWithRedux todolist={el}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}
