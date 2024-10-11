import Grid from "@mui/material/Grid";
import {AddItemForm} from "../common/components/AddItemForm";
import Container from "@mui/material/Container";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";

export const Main = () => {

    const dispatch = useAppDispatch()

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