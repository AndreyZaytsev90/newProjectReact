import {ThemeMode} from "../App";

export const changeModeReducer = (state: ThemeMode, action: ActionModeType) => {
    switch (action.type) {
        case "CHANGE-MODE":
            return action.payload.themeMode === 'light' ? 'dark' : 'light'
    }
}

type ActionModeType = ReturnType<typeof changeModeAC>
export const changeModeAC = (themeMode: ThemeMode) => {
    return {
        type: "CHANGE-MODE",
        payload: {themeMode}
    } as const
}