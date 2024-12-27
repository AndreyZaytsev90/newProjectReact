import {setAppErrorAC} from "app/app-reducer";
import {AppDispatch} from "app/store";

export const handleNetworkError = (err: unknown, dispatch: AppDispatch) => {
    //code
    if (err instanceof Error) {
        dispatch(setAppErrorAC(err.message));
    } else {
        dispatch(setAppErrorAC('An unknown error occurred'));
    }
}