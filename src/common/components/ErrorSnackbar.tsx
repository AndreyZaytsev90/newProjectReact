import React from 'react';
import {SyntheticEvent, useState} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "common/hooks";
import {selectErrors} from "app/appSelectors";
import {setAppErrorAC} from "app/app-reducer";

export const ErrorSnackbar = () => {
    //const [open, setOpen] = useState(true);
    const dispatch = useAppDispatch()
    const error = useAppSelector(selectErrors)

    const handleClose = (
        event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        //setOpen(false);
        dispatch(setAppErrorAC(null))
    };
    console.log(error)

    return (


            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal:'left', vertical: 'bottom'}}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                   {error}
                </Alert>
            </Snackbar>

    );
}
