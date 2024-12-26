import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

export type AddItemFormType = {
  addItem: (title: string) => void
  disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormType> = ({ addItem, disabled }) => {
  let [title, setTitle] = useState<string>("")
  let [disabledButton, setDisabledButton] = useState<boolean>(true)
  let [inputError, setInputError] = useState<boolean>(false)

  /*let todolists = useAppSelector(selectTodolists) //используем селектор
  let dispatch = useDispatch()*/

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length > 0 ? setDisabledButton(false) : setDisabledButton(true)
    setTitle(e.currentTarget.value)
    inputError && setInputError(false)
  }
  const addItemHandler = () => {
    if (title.trim()) {
      addItem(title.trim())
     setDisabledButton(true)
      setInputError(false)
    } else {
      setInputError(true)
    }
    setTitle("")
  }
  const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && title) {
      addItemHandler()
    }
  }

  const styles = {
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
  }

  return (
    <div>
      <TextField
        error={inputError}
        id="outlined-basic"
        value={title}
        label={inputError ? "Title is required" : "New title"}
        variant="outlined"
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        size={"small"}
        disabled={disabled}
      />
      <Button variant="contained" color="success" onClick={addItemHandler} disabled={disabledButton} style={styles}>
        +
      </Button>{" "}
      {/*из materialUI*/}
    </div>
  )
}
