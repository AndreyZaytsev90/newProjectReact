import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";

// Расширяем функционал useDispatch. Теперь будет возможно передавать ни только action, но и функций (thunk)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
