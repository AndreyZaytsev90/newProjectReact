import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from "../common/theme/getTheme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";


function AppWithRedux() {

    /*let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)*/
    let themeMode = useAppSelector(state => state.app.themeMode)

    const theme = getTheme(themeMode)


    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
    </ThemeProvider>
}

export default AppWithRedux;
