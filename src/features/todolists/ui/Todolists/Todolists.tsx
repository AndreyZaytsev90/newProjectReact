import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "./todolist/TodolistWithRedux";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export const Todolists = () => {

    /*let todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)*/
    let todolists = useAppSelector(state => state.todolists)

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