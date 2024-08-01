import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


export type AddItemFormType = {
    todolistId: string,
    addTask?: (todolistId: string, title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = ({addTask, todolistId}) => {


    let [taskTitle, setTaskTitle] = useState<string>('')
    let [disabled, setDisabled] = useState<boolean>(true)
    let [inputError, setInputError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true)
        setTaskTitle(e.currentTarget.value)
        inputError && setInputError(false)
    }
    const addTaskHandler = () => {
        if (taskTitle.trim() && addTask) {
            addTask(todolistId, taskTitle.trim())
            setDisabled(true)
            setInputError(false)
        } else {
            setInputError(true)
        }
        setTaskTitle('')
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input
                onChange={onChangeHandler}
                value={taskTitle}
                onKeyUp={onKeyUpHandler}
                className={inputError ? "error" : ''}
            />
            <Button name="+" callback={addTaskHandler} isDisabled={disabled}/>
            {inputError && <div className="error-message">Title is required!</div>}
        </div>
    );
};
