import { FieldError } from "../../features/todolists/api/todolistsApi.types"

export type Response<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: T
}
