interface ButtonType {
  name: string
  callback?: () => void
  isDisabled?: boolean
  className?: string
}

export const Button = ({ name, callback, isDisabled, className }: ButtonType) => {
  const onClickHandler = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <button className={className} disabled={isDisabled} onClick={onClickHandler}>
      {name}
    </button>
  )
}
