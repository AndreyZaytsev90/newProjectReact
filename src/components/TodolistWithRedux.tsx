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

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id, title))
    }

    return (
        <div className="todolist">
            <div className={'todolist-title-container'}>
                <TodolistTitle todolist={todolist}/>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <Tasks todolist={todolist}/>
            <div>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
};
