import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm";
import Container from "@mui/material/Container";
import {useDispatch} from "react-redux";
import {addTodolistAC} from "../state/todolists-reducer";
import {Todolists} from "./Todolists";

export const Main = () => {

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
                <Todolists/>
            </Grid>
        </Container>
    );
};