import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../state/store";
import {sortPacksAC} from "../../../../../state/cardPacksReducer";
import s from "./universalHeader.module.scss"
type HeaderPropsType = {
    headerValue: string
    sortedValue: string
}
export const UniversalHeader = ({headerValue, sortedValue}: HeaderPropsType) => {
    const dispatch = useAppDispatch()
    const sortPacks = useAppSelector(state => state.cardPacksReducer.sortPacks);
    const onClickHandler = () => {
        if (sortPacks.slice(1) === sortedValue) {
            dispatch(sortPacksAC(sortPacks[0] === "0" ? 1 + sortedValue : 0 + sortedValue))
        } else {
            dispatch(sortPacksAC( 0 + sortedValue))
        }
    }
    return (
        <div onClick={onClickHandler} className={s.tableHeaderBlock}>
            {headerValue}
        </div>
    );
};

