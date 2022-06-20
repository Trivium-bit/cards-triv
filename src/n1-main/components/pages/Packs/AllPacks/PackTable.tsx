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
import {NavLink} from "react-router-dom";

import {
    myCardsPacksSelector,
    userIdSelector,
    isMyTableSelector,
    minSelector,
    maxSelector,
    searchPackNameSelector,
    cardPacksCurrentPageSelector, sortCardPacksSelector, totalCardPacksPageCountSelector,
} from "../../../../../Common/Selectors/Selectors";
import {
    CardPackUpdateRequestType,
    getCardsPacksTC, setCardPackCurrentPageAC,
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
import {EditAddModalContainer} from "../../../Modals/EditAddModalContainer";
import {LearnModalContainer} from "../../../Modals/LearnModalContainer";
import {maxCardPackNameLength} from "../PacksHeader";

//styles mui
const StyledTableCell = styled(TableCell)((theme) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
        fontSize: 13,
        ["@media (max-height:800px)"]: {
            display: theme.className === s.hideForMobile ? "none" : ""
        }
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        height: 29,
        maxHeight: 30,
        ["@media (max-height:800px)"]: {
            display: theme.className === s.hideForMobile ? "none" : ""
        }
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

    const dispatch = useAppDispatch();
    const searchingPackName = useAppSelector<string>(searchPackNameSelector);
    const isMyTable = useAppSelector<boolean>(isMyTableSelector);
    const min = useAppSelector<number>(minSelector);
    const max = useAppSelector<number>(maxSelector);
    const myId = useAppSelector<string>(userIdSelector);
    const myCardPacks = useAppSelector(myCardsPacksSelector);
    const sortPacks = useAppSelector<string>(sortCardPacksSelector);
    const [debounceLocalPackName] = useDebounce(searchingPackName, debounceDelay);
    const totalCardPacksPageCount = useAppSelector<number>(totalCardPacksPageCountSelector);
    const currentPage = useAppSelector<number>(cardPacksCurrentPageSelector)

    const [rowToDelete, setRowToDelete] = useState<PacksResponseType | undefined>(undefined);
    const [rowToUpdate, setRowToUpdate] = useState<CardPackUpdateRequestType | undefined>(undefined);
    const [rowToLearn, setRowToLearn] = useState<PacksResponseType | undefined>(undefined);

    const handleOpenEdit = (card: PacksResponseType) => setRowToUpdate(card);
    const handleOpenDelete = (cardPack: PacksResponseType) => setRowToDelete(cardPack);
    const handleOpenLearn = (cardPack: PacksResponseType) => setRowToLearn(cardPack);
    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCardPackCurrentPageAC(page))
        dispatch(getCardsPacksTC())
    }

    useEffect(() => {
        dispatch(setCardPackCurrentPageAC(1))
        dispatch(getCardsPacksTC())
    }, [dispatch, isMyTable, debounceLocalPackName, min, max, sortPacks]);

    return (
        <Box className={s.wrapper}>
            {myCardPacks.length !== 0 ?
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
                                <StyledTableCell align="center" className={s.hideForMobile}>
                                    <InlineCel className={s.headerItem}>
                                        <UniversalHeader headerValue={"Last Updated"} sortedValue={"updated"}/>
                                        {sortPacks === "0updated" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                    </InlineCel>
                                </StyledTableCell>
                                <StyledTableCell align="center" className={s.hideForMobile}>
                                    <InlineCel>
                                        <UniversalHeader headerValue={"Created by"} sortedValue={"name"}/>
                                        {sortPacks === "0name" ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}

                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center" >Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={s.tableBody}>
                        {
                            myCardPacks.map((cardPack => <StyledTableRow key={cardPack._id}>
                                    {cardPack.user_id === myId
                                        ?
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={`${PATH.PACKS}/${cardPack._id}`}>
                                                {cardPack.name.slice(0, maxCardPackNameLength)}
                                            </NavLink>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell component="th" scope="row">{cardPack.name.slice(0, maxCardPackNameLength)}</StyledTableCell>
                                    }
                                    <StyledTableCell align="left">{cardPack.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="left" className={s.hideForMobile}>
                                        {
                                            moment(cardPack.updated).format("DD.MM.YYYY HH:mm:ss")
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={s.hideForMobile} >{cardPack.user_name.slice(0,50)}</StyledTableCell>
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
                                            <button onClick={() => handleOpenLearn(cardPack)}
                                                    className={s.edit}>Learn
                                            </button>
                                            <button
                                                className={s.info}>Info
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
            {totalCardPacksPageCount > 1 &&
            <Pagination onChange={handleChangePagination} count={totalCardPacksPageCount} page={currentPage}
                        shape="rounded"/>}

            <DeleteModalContainer styles={modalStyle} pack={rowToDelete} closeModalCallback={setRowToDelete}/>
            <EditAddModalContainer styles={modalStyle} pack={rowToUpdate} closeModalCallback={setRowToUpdate}/>
            <LearnModalContainer styles={modalStyle} pack={rowToLearn} closeModalCallback={setRowToLearn}/>

        </Box>


    );
});
