interface ButtonType {
    name: string
    callback?: () => void | undefined
}

export const Button = ({name, callback}: ButtonType) => {

    const onClickHandler = () => {
        if (callback) {
            callback()
        }
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};