interface ButtonType {
    name: string
    callback?: () => void
    isDisabled?: boolean
}

export const Button = ({name, callback, isDisabled}: ButtonType) => {

    const onClickHandler = () => {
        if (callback) {
            callback()
        }
    }

    return (
        <button disabled={isDisabled} onClick={onClickHandler}>{name}</button>
    );
};