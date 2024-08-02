import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


export type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {


    let [title, setTitle] = useState<string>('')
    let [disabled, setDisabled] = useState<boolean>(true)
    let [inputError, setInputError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value.length > 0 ? setDisabled(false) : setDisabled(true)
        setTitle(e.currentTarget.value)
        inputError && setInputError(false)
    }
    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title.trim())
            setDisabled(true)
            setInputError(false)
        } else {
            setInputError(true)
        }
        setTitle('')
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && title) {
            addItemHandler()
        }
    }

    return (
        <div>
            <input
                onChange={onChangeHandler}
                value={title}
                onKeyUp={onKeyUpHandler}
                className={inputError ? "error" : ''}
            />
            <Button name="+" callback={addItemHandler} isDisabled={disabled}/>
            {inputError && <div className="error-message">Title is required!</div>}
        </div>
    );
};
