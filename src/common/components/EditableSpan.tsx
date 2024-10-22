import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, callback}) => {

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

    return (
        edit
            ? <input value={newTitle}
                     onChange={onChangeHandler}
                     onBlur={editHandler}
                     onKeyUp={onKeyUpHandler}
                     autoFocus/>
            : <span onDoubleClick={editHandler}>{title}</span>
    );
};
