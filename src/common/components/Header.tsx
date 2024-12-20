import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import {changeThemeAC} from "app/app-reducer"
import {useAppDispatch} from "common/hooks"
import {useAppSelector} from "common/hooks"
import {selectStatus, selectTheme} from "app/appSelectors"
import LinearProgress from "@mui/material/LinearProgress";

export const Header = () => {
    let themeMode = useAppSelector(selectTheme)
    let appStatus = useAppSelector(selectStatus)

    const dispatch = useAppDispatch()

    const changeThemeHandler = () => {
        dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light" ))
    }

    return (
        <AppBar>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Logout</Button>
                    <Button color="inherit">Faq</Button>
                    <Switch color={"default"} onChange={changeThemeHandler}/>
                </div>
            </Toolbar>
            {appStatus === 'loading' && <LinearProgress/>} {/*Крутилка*/}
        </AppBar>
    )
}
