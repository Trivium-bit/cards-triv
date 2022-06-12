import React, {useEffect, useState} from 'react';
import {
    Box, FormControl, FormControlLabel, Input, InputLabel, Modal, Pagination,
    Paper, Radio, RadioGroup,
    styled,
    Table,
    TableBody, TableCell,
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

//types


//styles mui
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
        fontSize: 13,
        border: "1px solid black"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

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

    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const isMyTable = useAppSelector<boolean>(state => state.cardPacksReducer.isMyTable);
    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const myId = useAppSelector<string>(userIdSelector);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const myCardPacks = useAppSelector(myCardsPacksSelector);
    const myCardsPagination = useSelector(myCardsPaginationSelector);
    const updatedCardPackName = useAppSelector<string>(state => state.cardPacksReducer.newCardPackName);
    const [rowToDelete, setRowToDelete] = useState<PacksResponseType | undefined>(undefined);
    const [rowToUpdate, setRowToUpdate] = useState<CardPackUpdateRequestType | undefined>(undefined);
    const [openAnswer, setOpenAnswer] = useState<PacksResponseType | undefined>(undefined);
    const [openLearn, setOpenLearn] = useState(false);
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
    const handleOpenLearn = () => setOpenLearn(true);
    const handleCloseLearn = () => {
        setOpenAnswer(undefined);
        setOpenLearn(false);
    };
    const updatePackName = () => {
        if (rowToUpdate) {
            dispatch(editMyCardsPacksTC({_id: rowToUpdate._id, name: updatedCardPackName}, currentPage))
            handleCloseEdit();
        }

    };

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
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
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >
                                <UniversalHeader headerValue={"Name"}
                                                 sortedValue={"user_name"}/>
                                {sortPacks === "0user_name" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                                <UniversalHeader headerValue={"Cards"}
                                                 sortedValue={"cardsCount"}/>
                                {sortPacks === "0cardsCount" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                                <UniversalHeader headerValue={"Last Updated"}
                                                 sortedValue={"updated"}/>
                                {sortPacks === "0updated" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                                <UniversalHeader headerValue={"Created by"}
                                                 sortedValue={"name"}/>
                                {sortPacks === "0name" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                            </StyledTableCell>
                            <StyledTableCell  align="center">Actions</StyledTableCell>
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
                                            <button onClick={() => handleOpenAnswer(cardPack)} className={s.edit}>Learn
                                            </button>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {/*// Show Answer Modal*/}
            <Pagination onChange={handleChangePagination} count={myCardsPagination.count}
                        page={myCardsPagination.current} shape="rounded"/>

            <Modal
                open={!!openAnswer}
                onClose={handleCloseAnswer}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock}>
                    <h1 className={modalStyles.modalTitle}>{openAnswer?.name}</h1>
                    <p className={modalStyles.modalText}><b>Question:</b>“How "This" works in JavaScript?”</p>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseAnswer} className={modalStyles.btnCancel} title={'Cancel'}/>
                        <Button onClick={handleOpenLearn} className={modalStyles.btnSave} title={'Show Answer'}/>
                    </Box>
                </Box>
            </Modal>

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

            {/*Learn Modal*/}
            <Modal
                open={openLearn}
                onClose={handleCloseLearn}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock}>
                    <h1 className={modalStyles.modalTitle}>Learn {openAnswer?.name}</h1>
                    <p className={modalStyles.modalText}><b>Question:</b>“How "This" works in JavaScript?”</p>
                    <p className={modalStyles.modalText}><b>Answer:</b>“This is how "This" works in JavaScript”</p>
                    <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Did you know" control={<Radio/>} label="Did you know"/>
                        <FormControlLabel value="Forgot" control={<Radio/>} label="Forgot"/>
                        <FormControlLabel value="Confused" control={<Radio/>} label="Confused"/>
                    </RadioGroup>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseLearn} className={modalStyles.btnCancel} title={'Cancel'}/>
                        <Button className={modalStyles.btnSave} title={'Next'}/>
                    </Box>
                </Box>
            </Modal>
        </Box>


    );
});
