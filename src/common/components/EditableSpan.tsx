import React, {useState, ChangeEvent, KeyboardEvent} from "react"

type EditableSpanType = {
    title: string
    callback: (title: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, callback, disabled}) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState<string>(title)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) updateTaskHandler()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            editHandler()
        }
    }

    const updateTaskHandler = () => {
        callback(newTitle)
    }

    const editMode = disabled ? false : edit


    return editMode ? (
        <input value={newTitle} onChange={onChangeHandler} onBlur={editHandler} onKeyUp={onKeyUpHandler} autoFocus/>
    ) : (
        <span onDoubleClick={editHandler}>{title}</span>
    )
}
