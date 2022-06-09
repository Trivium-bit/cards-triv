import React, {useEffect} from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/pages/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "./state/auth-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {Loader} from "./Common/Components/Loader";
import {appStatusSelector, isInitializedSelector} from "./Common/Selectors/Selectors";
import {RequestStatusType} from "./state/app-reducer";
import {useDebounce} from "./utils/useDebounce";
import {getCardsPacksTC} from "./state/cardPacksReducer";
import {useSearchParams} from "react-router-dom";


function App() {
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch();
    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.searchPackName);
    const debounceDelay = 1000;
    const isMyTable = useAppSelector<boolean>(state => state.cardPacksReducer.isMyTable);
    const [searchParams] = useSearchParams()
    const currentPage = Number( searchParams.get("page")) || 1;
    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const debouncePackName = useDebounce(debounceDelay,localPackName ).toString();//это значение со строки поиска имени пэка задержки дебаунса
    const [minQuery, maxQuery] = useDebounce(debounceDelay,min, max ); //это значения со слайдера после задержки дебаунса

    useEffect(() => {
        dispatch(getCardsPacksTC(isMyTable, currentPage, debouncePackName,minQuery, maxQuery ))
    }, [currentPage, dispatch, isMyTable, debouncePackName, minQuery, maxQuery]);
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <div className="App">
            {appStatus === 'loading' && <Loader/>}
            <AppRoutes/>
            <ErrorSnackBar/>
        </div>
    );
}

export default App;


