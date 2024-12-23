//Файл index.ts служит для реэкспорта файлов для сокращения импорта в компонентах
export { EditableSpan } from "./EditableSpan"
export { AddItemForm } from "./AddItemForm"
export { ErrorSnackbar } from "./ErrorSnackbar"

//аналогично если в файле много экспортов используют *
/*
export * from './EditableSpan'
export * from './AddItemForm'
*/
