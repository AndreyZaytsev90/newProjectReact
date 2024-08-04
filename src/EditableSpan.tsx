import { useState, ChangeEvent } from "react";

type EditableSpanType = {
	globalTitle: string
}

export const EditableSpan: React.FC<EditableSpanType> = ({ globalTitle }) => {

	const [edit, setEdit] = useState(false)
	let [title, setTitleInput] = useState<string>(globalTitle)

	const editHandler = () => setEdit(!edit)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleInput(e.currentTarget.value)
	}

	const onBlurHandler = () => {
		setEdit(!edit)
	}

	return (
		edit
			? <input value={title}
				onChange={(e) => onChangeHandler(e)}
				onBlur={onBlurHandler}
				autoFocus />
			: <span onDoubleClick={editHandler}>{globalTitle}</span>
	);
};
