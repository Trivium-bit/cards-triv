import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Box,
    FormControl,
    Input,
    InputLabel,
    Modal,
    Pagination,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Button from "../../../../../Common/Components/Button";
import s from './AllTable.module.scss'
import modalStyles from '../styles/ModalStyles.module.scss'
import {useSearchParams, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    appStatusSelector,
    myCardsPaginationSelector,
    myCardsPacksSelector, userIdSelector,
} from "../../../../../Common/Selectors/Selectors";
import {
    CardPackUpdateRequestType,
    deleteCardPackTC,
    editCardPackAC,
    editMyCardsPacksTC, getCardsPacksTC,
} from "../../../../../state/cardPacksReducer";

import {useAppDispatch, useAppSelector} from "../../../../../state/store";
import {PacksResponseType} from "../../../../../api/cardPacksAPI";
import {RequestStatusType} from "../../../../../state/app-reducer";
import {useDebounce} from "use-debounce";
import {PATH} from "../../../AppRoutes";
import {debounceDelay} from "../../../Slider/Slider";
import {UniversalHeader} from "./universalHeader";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PackModalBody from "./PackModalBody";

//types


//styles mui
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
        fontSize: 13
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
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
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#F9F9FE',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

//table
export const PackTable = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const isMyTable = useAppSelector<boolean>(state => state.cardPacksReducer.isMyTable);
    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const myId = useAppSelector<string>(userIdSelector);
    const myCardPacks = useAppSelector(myCardsPacksSelector);
    const myCardsPagination = useSelector(myCardsPaginationSelector);
    const updatedCardPackName = useAppSelector<string>(state => state.cardPacksReducer.newCardPackName);
    const [rowToDelete, setRowToDelete] = useState<PacksResponseType | undefined>(undefined);
    const [rowToUpdate, setRowToUpdate] = useState<CardPackUpdateRequestType | undefined>(undefined);
    const [openAnswer, setOpenAnswer] = useState<PacksResponseType | undefined>(undefined);
    const sortPacks = useAppSelector<string>(state => state.cardPacksReducer.sortPacks);
    const [debounceLocalPackName] = useDebounce(localPackName, debounceDelay);

    const handleOpenEdit = (card: PacksResponseType) => setRowToUpdate(card);
    const handleCloseEdit = () => setRowToUpdate(undefined);
    const currentPage = Number(searchParams.get("page")) || 1;

    const handleChangeNewPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editCardPackAC((event.target.value)));
    };

    const handleOpenDelete = (card: PacksResponseType) => setRowToDelete(card);
    const handleCloseDelete = () => setRowToDelete(undefined);
    const handleOpenAnswer = (card: PacksResponseType) => setOpenAnswer(card);
    const handleCloseAnswer = () => setOpenAnswer(undefined);
    const updatePackName = () => {
        if (rowToUpdate) {
            dispatch(editMyCardsPacksTC({_id: rowToUpdate._id, name: updatedCardPackName}, currentPage))
            handleCloseEdit();
        }

    };

    const handleChangePagination = (event:ChangeEvent<unknown>, page: number) => {
        searchParams.set('page', page.toString())
        setSearchParams(searchParams)

    }
    const handleDeletePack = () => {
        if (rowToDelete) {
            dispatch(deleteCardPackTC(rowToDelete._id, currentPage))
            handleCloseDelete();
        }
    }

    useEffect(() => {
        dispatch(getCardsPacksTC(currentPage))
    }, [currentPage, dispatch, isMyTable, debounceLocalPackName, min, max, sortPacks]);

    return (
        <Box className={s.wrapper}>
            <TableContainer className={s.table} component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <InlineCel>
                                    <UniversalHeader
                                        headerValue={"Name"}
                                        sortedValue={"user_name"}
                                    />
                                    {sortPacks === "0user_name" ? <ArrowDropDownIcon className={s.icon}/> :
                                        <ArrowDropUpIcon/>}
                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel>
                                    <UniversalHeader
                                        headerValue={"Cards"}
                                        sortedValue={"cardsCount"}
                                    />
                                    {sortPacks === "0cardsCount" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel>
                                    <UniversalHeader
                                        headerValue={"Last Updated"}
                                        sortedValue={"updated"}
                                    />
                                    {sortPacks === "0updated" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                                </InlineCel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <InlineCel>
                                    <UniversalHeader
                                        headerValue={"Created by"}
                                        sortedValue={"name"}
                                    />
                                    {sortPacks === "0name" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
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
                                                {cardPack.name}
                                            </NavLink>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell component="th" scope="row">{cardPack.name}</StyledTableCell>
                                    }
                                    <StyledTableCell align="left">{cardPack.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {
                                            cardPack.updated.substring(0, 10)
                                                .replace(/-/g, " ")
                                                .replace(/(\w+) (\w+) (\w+)/, (match, year, month, day) => `${day}.${month}.${year}`)
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{cardPack.user_name}</StyledTableCell>
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
                                            <button
                                                onClick={() => handleOpenAnswer(cardPack)}
                                                className={s.edit}
                                            >
                                                Learn
                                            </button>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination onChange={handleChangePagination} count={myCardsPagination.count}
                        page={myCardsPagination.current} shape="rounded"/>

            {/*// Delete Button Modal*/}
            <Modal
                open={!!rowToDelete}
                onClose={handleCloseDelete}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock}>
                    <h1 onClick={handleDeletePack} className={modalStyles.modalTitle}>Delete Pack</h1>
                    <Box>
                        <span className={modalStyles.modalText}>Do you really want to remove
                            <b> {rowToDelete?.name}</b>?
                            All cards will be excluded from this course
                        </span>
                    </Box>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseDelete} className={modalStyles.btnCancel} title={'Cancel'}
                                disabled={appStatus === "loading"}/>
                        <Button onClick={handleDeletePack} className={modalStyles.btnSave} title={'Save'}
                                disabled={appStatus === "loading"}/>

                    </Box>
                </Box>
            </Modal>

            {/*Edit Modal*/}
            <Modal
                open={!!rowToUpdate}
                onClose={handleCloseEdit}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock}>
                    <h1 className={modalStyles.modalTitle}>Enter new card pack name</h1>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Enter new card pack name</InputLabel>
                        <Input className={modalStyles.inputsForm} id="component-simple" autoFocus={true}
                               value={updatedCardPackName}
                               onChange={handleChangeNewPack} disabled={appStatus === "loading"}/>
                    </FormControl>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseEdit} className={modalStyles.btnCancel} title={'Cancel'}
                                disabled={appStatus === "loading"}/>
                        <Button onClick={updatePackName} className={modalStyles.btnSave} title={'Save new name'}
                                disabled={appStatus === "loading"}/>
                    </Box>
                </Box>
            </Modal>
            {/*// Show Question Modal*/}
            <Modal
                open={!!openAnswer}
                onClose={handleCloseAnswer}
            >
                <PackModalBody openAnswer={openAnswer}  onCancel={handleCloseAnswer} />
            </Modal>
        </Box>


    );
});
