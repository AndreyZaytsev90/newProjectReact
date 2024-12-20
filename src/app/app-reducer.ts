export type ThemeModeType = "dark" | "light"
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = typeof initialState

const initialState = {
    themeMode: "light" as ThemeModeType,
    status: 'idle' as RequestStatus,
}

export const appReducer = (state = initialState, action: ActionAppReducerType): InitialState => {
    switch (action.type) {
        case "CHANGE-THEME":
            return {...state, themeMode: action.payload.themeMode}
        case 'SET_STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}


export const changeThemeAC = (themeMode: ThemeModeType) => {
    return {
        type: "CHANGE-THEME",
        payload: {themeMode},
    } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
    return {
        type: 'SET_STATUS',
        payload: {status},
    } as const
}

export type ActionAppReducerType = ChangeThemeActionType | SetAppStatusActionType

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>