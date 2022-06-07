import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {AppThunkDispatch} from "../state/store";
import {AxiosError} from "axios";

export const handleNetworkError = (error: AxiosError<{ error: string }>, dispatch: AppThunkDispatch) =>{
    dispatch(setAppStatusAC("failed"));
    dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
}