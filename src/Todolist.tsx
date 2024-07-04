import './App.css';
import {Button} from "./Button";

interface TodolistType {
    title: string
}
export const Todolist = ({title}: TodolistType) => {

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div >
                <input/>
                <Button name="+" callback={()=> {}}/>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                <li><input type="checkbox" checked={false}/> <span>React</span></li>
            </ul>
            <div>
                <Button name="All" callback={()=> {}}/>
                <Button name="Active" callback={()=> {}}/>
                <Button name="Completed" callback={()=> {}}/>
            </div>
        </div>
    );
};