import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useSelector} from "react-redux";
import {RootStateType} from "./store";
import {getTheme} from "../common/theme/getTheme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {ThemeModeType} from "./app-reducer";


function AppWithRedux() {

    let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)

    const theme = getTheme(themeMode)


    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
    </ThemeProvider>
}

export default AppWithRedux;
