import {setAppErrorAC, setAppStatusAC} from "../n1-main/bll/app-reducer";
import {AppThunkDispatch} from "../n1-main/bll/store";
import {AxiosError} from "axios";

export const handleNetworkError = (error: AxiosError<{ error: string }>, dispatch: AppThunkDispatch) =>{
    dispatch(setAppStatusAC("failed"));
    dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
}