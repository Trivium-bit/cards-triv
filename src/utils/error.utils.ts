import {setAppStatusAC} from "../state/app-reducer";
import {AppThunkDispatch} from "../state/store";
import {AxiosError} from "axios";

export const handleNetworkError = (error: AxiosError<{ error: string }>, dispatch: AppThunkDispatch) =>{
    dispatch(setAppStatusAC("failed"));
    console.log(error.response?.data.error || "some Error")
    /*dispatch(setAppErrorAC(error.response?.data.error || "some Error"));*/
}