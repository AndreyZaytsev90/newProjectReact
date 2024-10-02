import {ThemeMode} from "../App";

const initialState : ThemeMode = 'light'

export const changeModeReducer = (state:ThemeMode = initialState, action: ActionModeType) => {
    switch (action.type) {
        case "CHANGE-MODE":
            return action.payload.themeMode === 'light' ? 'dark' : 'light'
        default:
            return state
    }

}

export type ActionModeType = ReturnType<typeof changeModeAC>
export const changeModeAC = (themeMode: ThemeMode) => {
    return {
        type: "CHANGE-MODE",
        payload: {themeMode}
    } as const
}