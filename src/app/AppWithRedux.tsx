import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from "common/theme/getTheme";
import {Header} from "common/components/Header";
import {Main} from "./Main";
import {selectTheme} from "./appSelectors";
import {useAppSelector} from "common/hooks";


export const AppWithRedux = () => {

    /*let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)*/
    let themeMode = useAppSelector(selectTheme)

    const theme = getTheme(themeMode)

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
    </ThemeProvider>
}


