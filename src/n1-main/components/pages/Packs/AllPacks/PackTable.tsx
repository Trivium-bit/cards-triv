import React, {useEffect, useState} from 'react';
import {
    Box, Pagination,
    Paper,
    styled,
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import s from './AllTable.module.scss'
import {useSearchParams, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {

    myCardsPaginationSelector,
    myCardsPacksSelector, userIdSelector,
} from "../../../../../Common/Selectors/Selectors";
import {
    CardPackUpdateRequestType,
    getCardsPacksTC,
} from "../../../../../state/cardPacksReducer";

import {useAppDispatch, useAppSelector} from "../../../../../state/store";
import {PacksResponseType} from "../../../../../api/cardPacksAPI";
import {useDebounce} from "use-debounce";
import {PATH} from "../../../AppRoutes";
import {debounceDelay} from "../../../Slider/Slider";
import {UniversalHeader} from "./universalHeader";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import moment from "moment/moment";
import {DeleteModalContainer} from "../../../Modals/DeleteModalContainer";
import {EditModalContainer} from "../../../Modals/EditModalContainer";
import {LearnModalContainer} from "../../../Modals/LearnModalContainer";

//types


//styles mui
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
        fontSize: 13,


    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        height:29,
        maxHeight: 30,
        // boxSizing: "border-box",
    },
}));

const InlineCel = styled("div")(() => ({
    display: "flex"
}))

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#F8F7FD",
    },
}));
export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#F9F9FE',
    boxShadow: 24 as unknown as 'BoxShadow | undefined',
    p: 4,
    borderRadius: 2,
};

//table
export const PackTable = React.memo(() => {

    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const isMyTable = useAppSelector<boolean>(state => state.cardPacksReducer.isMyTable);
    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const myId = useAppSelector<string>(userIdSelector);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const myCardPacks = useAppSelector(myCardsPacksSelector);
    const myCardsPagination = useSelector(myCardsPaginationSelector);
    const [rowToDelete, setRowToDelete] = useState<PacksResponseType | undefined>(undefined);
    const [rowToUpdate, setRowToUpdate] = useState<CardPackUpdateRequestType | undefined>(undefined);
    const [openLearnModal, setOpenLearnModal] = useState<PacksResponseType | undefined>(undefined);
    const sortPacks = useAppSelector<string>(state => state.cardPacksReducer.sortPacks);
    const [debounceLocalPackName] = useDebounce(localPackName, debounceDelay);

    const handleOpenEdit = (card: PacksResponseType) => setRowToUpdate(card);

    const currentPage = Number(searchParams.get("page")) || 1;
    const handleOpenDelete = (card: PacksResponseType) => setRowToDelete(card);
    const handleOpenLearn = (card: PacksResponseType) => {
        setOpenLearnModal(card)
    };

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        searchParams.set('page', page.toString())
        setSearchParams(searchParams)

    }

    useEffect(() => {
        dispatch(getCardsPacksTC(currentPage))
    }, [currentPage, dispatch, isMyTable, debounceLocalPackName, min, max, sortPacks]);

    return (
        <Box className={s.wrapper}>
            { myCardPacks.length !== 0 ?
                <TableContainer className={s.table} component={Paper}>
                <Table sx={{maxWidth: 800}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <InlineCel className={s.headerItem}>
                                    <UniversalHeader headerValue={"Name"} sortedValue={"user_name"}/>
                                    {sortPacks === "0user_name" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel className={s.headerItem}>
                                    <UniversalHeader headerValue={"Cards"} sortedValue={"cardsCount"}/>
                                    {sortPacks === "0cardsCount" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel className={s.headerItem}>
                                    <UniversalHeader headerValue={"Last Updated"} sortedValue={"updated"}/>
                                    {sortPacks === "0updated" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel>
                                    <UniversalHeader headerValue={"Created by"} sortedValue={"name"}/>
                                    {sortPacks === "0name" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={s.tableBody}>
                        {
                            myCardPacks.map((cardPack => <StyledTableRow key={cardPack._id}>
                                    {cardPack.user_id === myId
                                        ?
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={`${PATH.PACKS}/${cardPack._id}`}>
                                                {cardPack.name.slice(0,26)}
                                            </NavLink>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell component="th" scope="row">{cardPack.name.slice(0,25)}</StyledTableCell>
                                    }
                                    <StyledTableCell align="left">{cardPack.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {
                                            moment(cardPack.updated).format("DD.MM.YYYY HH:mm:ss")
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{cardPack.user_name.slice(0,50)}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className={s.buttonGroup}>
                                            {cardPack.user_id === myId && (
                                                <>
                                                    <button onClick={() => handleOpenDelete(cardPack)}
                                                            className={s.delete}>Delete
                                                    </button>
                                                    <button onClick={() => handleOpenEdit(cardPack)}
                                                            className={s.edit}>Edit
                                                    </button>
                                                </>
                                            )}
                                            <button onClick={() => handleOpenLearn(cardPack)} className={s.edit}>Learn
                                            </button>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))

                        }


                    </TableBody>
                </Table>
            </TableContainer>
                :
                (
                    <div className={s.emptyPack}>
                                <span className={s.emptyText}>
                                    You don't have cards pack. Click "Add a new card pack" to create new card pack
                                </span>
                    </div>
                )
            }
            {myCardPacks.length !== 0 && <Pagination onChange={handleChangePagination} count={myCardsPagination.count}
                        page={myCardsPagination.current} shape="rounded"/>}

            <DeleteModalContainer styles = {modalStyle} rowToDelete={rowToDelete} setRowToDelete={setRowToDelete}/>
            <EditModalContainer styles = {modalStyle} rowToUpdate={rowToUpdate} setRowToUpdate={setRowToUpdate}/>
            <LearnModalContainer styles = {modalStyle} openLearnModal={openLearnModal} setOpenLearnModal={setOpenLearnModal}/>

        </Box>


    );
});
