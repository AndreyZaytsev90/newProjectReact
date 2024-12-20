import { RootStateType } from "./store"

export const selectTheme = (state: RootStateType) => state.app.themeMode
export const selectStatus = (state: RootStateType) => state.app.status

