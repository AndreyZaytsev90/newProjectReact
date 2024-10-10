import '../app/App.css';
import {AddItemForm} from "./AddItemForm";
import {useDispatch} from "react-redux";
import {addTaskAC} from "../state/tasks-reducer";
import {TodolistsType} from "../state/todolists-reducer";
import {TodolistTitle} from "./TodolistTitle";
import {Tasks} from "./Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons";


type TodolistWithReduxType = {
    todolist: TodolistsType
}

export const TodolistWithRedux = ({todolist}: TodolistWithReduxType) => {

    const {id} = todolist
    const dispatch = useDispatch()

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(id, newTitle))
    }

    return (
        <div className="todolist">
            <div className={'todolist-title-container'}>
                <TodolistTitle todolist={todolist}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    );
};
