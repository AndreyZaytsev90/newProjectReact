import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type EditableSpanType = {
    globalTitle: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({globalTitle, callback}) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState<string>(globalTitle)

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
            : <span onDoubleClick={editHandler}>{globalTitle}</span>
    );
};
