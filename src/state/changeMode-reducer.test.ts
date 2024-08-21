import {ThemeMode} from "../App";
import {changeModeAC, changeModeReducer} from "./changeMode-reducer";

test('The color theme of the Todolist app must be changed', () => {
    // 1. Стартовый state
    const startState: ThemeMode = "light"

    // 2. Действие
    const endState = changeModeReducer(startState, changeModeAC("light"))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    expect(endState).toBe("dark")
})