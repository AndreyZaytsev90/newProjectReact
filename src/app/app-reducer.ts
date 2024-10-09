export type ThemeModeType = 'dark' | 'light'

const initialState : ThemeModeType = 'light'

export const appReducer = (state = initialState, action: ActionAppReducerType)=> {
    switch (action.type) {
        case "CHANGE-THEME": return action.payload.themeMode === "light" ? "dark" : "light"
        default: return state
    }
}

export type ActionAppReducerType = ReturnType<typeof changeThemeAC>

export const changeThemeAC = (themeMode: ThemeModeType) => {
    return {
        type: "CHANGE-THEME",
        payload: {themeMode}
    }
}
