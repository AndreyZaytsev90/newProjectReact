import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "./todolist/TodolistWithRedux";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../app/store";
import {TodolistsType} from "../../model/todolists-reducer";

export const Todolists = () => {

    let todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)

    return (
        <>
            {todolists.map((el) => {
                return <Grid item key={el.id}>
                    <Paper elevation={3} style={{padding: '10px', margin: '10px'}}>
                        <TodolistWithRedux todolist={el}/>
                    </Paper>
                </Grid>
            })}
        </>
    );
};