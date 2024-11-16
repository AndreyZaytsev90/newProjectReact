export type ThemeModeType = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeModeType,
}

export const appReducer = (state = initialState, action: ActionAppReducerType): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME":
      return { ...state, themeMode: action.payload.themeMode === "light" ? "dark" : "light" }
    default:
      return state
  }
}

export type ActionAppReducerType = ReturnType<typeof changeThemeAC>

export const changeThemeAC = (themeMode: ThemeModeType) => {
  return {
    type: "CHANGE-THEME",
    payload: { themeMode },
  }
}
