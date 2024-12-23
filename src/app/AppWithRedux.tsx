import {ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {Header} from "common/components/Header"
import {Main} from "./Main"
import {selectTheme} from "./appSelectors"
import {useAppSelector} from "common/hooks"
import {getTheme} from "common/theme"
import {ErrorSnackbar} from "common/components";

export const AppWithRedux = () => {
    /*let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)*/
    let themeMode = useAppSelector(selectTheme)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </ThemeProvider>
    )
}
