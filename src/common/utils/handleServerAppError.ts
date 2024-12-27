import {setAppErrorAC, setAppStatusAC} from "app/app-reducer";
import {AppDispatch} from "app/store";
import {Response} from "common/types";

//Response<{item: DomainTodolist}
//Response<{item: DomainTask}
export const handleServerAppError = <T>(dispatch: AppDispatch, data: Response<T>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}