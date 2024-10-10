import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import {changeThemeAC, ThemeModeType} from "../../app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../app/store";


export const Header = () => {

    let themeMode = useSelector<RootStateType, ThemeModeType>(state => state.themes)

    const dispatch = useDispatch()

    const changeThemeHandler = () => {
        dispatch(changeThemeAC(themeMode))
    }

    return (
        <AppBar>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Logout</Button>
                    <Button color="inherit">Faq</Button>
                    <Switch color={'default'} onChange={changeThemeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};