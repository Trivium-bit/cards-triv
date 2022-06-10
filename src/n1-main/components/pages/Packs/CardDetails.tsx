import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    Box,
    Container, FormControl,
    Input,
    InputAdornment, InputLabel, Modal, Pagination,
    Paper, Rating,
    styled, Table, TableBody,
    TableCell,
    tableCellClasses, TableContainer, TableHead,
    TableRow
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";

import s from './styles/CardDetails.module.scss'
import styles from './MyPacks/MyTable.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {useSelector} from "react-redux";
import {
    appStatusSelector, cardPaginationSelector,
    getCardsSelector
} from "../../../../Common/Selectors/Selectors";
import {addNewCardTC, deleteCardTC, editCardTC, getCardsTC} from "../../../../state/cardsReducer";
import Button from "../../../../Common/Components/Button";
import modalStyles from "./styles/ModalStyles.module.scss";
import {RequestStatusType} from "../../../../state/app-reducer";
import {PackCardType} from "../../../../api/cardAPI";


//mui table styles
const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ }) => ({
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

//component
const CardDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {packId} = useParams();
    const cards = useSelector(getCardsSelector);
    const cardPagination = useSelector(cardPaginationSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<PackCardType | undefined>(undefined);
    const [inputQuestionValue, setInputQuestionValue] = useState('');
    const [inputAnswerValue, setInputAnswerValue] = useState('');
    const [inputEditQuestionValue, setInputEditQuestionValue] = useState('');
    const [inputEditAnswerValue, setInputEditAnswerValue] = useState('');


    const handleOpen = () => setOpen(true);
    const handleEditOpen = (row: any) => setEditOpen(row);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(undefined);

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    useEffect(() => {
        dispatch(getCardsTC(packId || '', currentPage))
    }, [currentPage])

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        navigate(`/packs/${packId}?page=${page}`)
    }

    const handleAddCard =() => {
    dispatch(addNewCardTC( packId || '',{
        question: inputQuestionValue,
        answer: inputAnswerValue
    }, () => {
        handleClose();
        dispatch(getCardsTC(packId || '', currentPage))
    }))
    }
    const handleChangeQuestion =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputQuestionValue(e.target.value)
    }
    const handleChangeAnswer =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswerValue(e.target.value)
    }
    const handleChangeEditQuestion =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputEditQuestionValue(e.target.value)
    }
    const handleChangeEditAnswer =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputEditAnswerValue(e.target.value)
    }

    const handleCardDelete = (id: any) => {
        dispatch(deleteCardTC(id, () => {
            dispatch(getCardsTC(packId || '', currentPage))
        }))
    }
    const updateCard = () => {
        if(editOpen && editOpen._id) {
            dispatch(editCardTC(editOpen._id,
                inputEditQuestionValue,
                inputEditAnswerValue ,
                () => {
                handleEditClose();
                dispatch(getCardsTC(packId || '', currentPage))
            }))
        }

    }

    return (
        <Container fixed >
            <Box className={s.packDetailBlock}>
                <Box className={s.nav} onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                    <span className={s.title}>Pack name</span>
                </Box>
                <Box className={s.headers}>
                    <Input
                        placeholder={"Search question..."}
                        startAdornment={
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Input
                        placeholder={"Search answer..."}
                        startAdornment={
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Button className={s.btn} title={'Add new card'} onClick={handleOpen} />
                </Box>
                <Box className={s.main}>
                    {cards.length !== 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Question</StyledTableCell>
                                        <StyledTableCell align="left">Answer</StyledTableCell>
                                        <StyledTableCell align="left">Last Updates</StyledTableCell>
                                        <StyledTableCell align="left">Grade</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cards.map((card) => (
                                        <StyledTableRow key={card._id}>
                                            <StyledTableCell component="th" scope="row">{card.question}</StyledTableCell>
                                            <StyledTableCell align="left">{card.answer}</StyledTableCell>
                                            <StyledTableCell align="left">{card.created}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Rating
                                                    size="small"
                                                    value={card.rating}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <div className={styles.buttonGroup}>
                                                    <button className={styles.delete} onClick={() => handleCardDelete(card._id)}>Delete</button>
                                                    <button className={styles.main} onClick={() => handleEditOpen(card)}>Edit</button>
                                                    <button className={styles.main}>Learn</button>
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        )}
                    <Pagination onChange={handleChangePagination} count={cardPagination.count}  page={cardPagination.current} shape="rounded" />
                    {
                        cards.length === 0 && (
                            <div className={s.emptyPack}>
                                <span className={s.emptyText}>
                                    This pack is empty. Click add new card to fill this pack
                                </span>
                            </div>
                        )
                    }
                    <Modal
                        open={!!editOpen}
                        onClose={handleEditClose}
                    >
                        <Box sx={modalStyle} className={modalStyles.modalBlock}>
                            <h1 className={modalStyles.modalTitle}>Edit Card</h1>
                            <Box>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Edit question</InputLabel>
                                    <Input defaultValue={editOpen?.question} className={modalStyles.inputsForm} onChange={handleChangeEditQuestion} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Edit answer</InputLabel>
                                    <Input defaultValue={editOpen?.answer} className={modalStyles.inputsForm} onChange={handleChangeEditAnswer} />
                                </FormControl>
                                <Box className={modalStyles.modalBtnGroup}>
                                    <Button onClick={handleEditClose} className={modalStyles.btnCancel} title={'Cancel'} disabled={appStatus ==="loading"}/>
                                    <Button className={modalStyles.btnSave} onClick={updateCard} title={'Save'} disabled={appStatus ==="loading"}/>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={modalStyle} className={modalStyles.modalBlock}>
                            <h1 className={modalStyles.modalTitle}>Add new card</h1>
                            <Box>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Question</InputLabel>
                                    <Input className={modalStyles.inputsForm} onChange={handleChangeQuestion} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Answer</InputLabel>
                                    <Input className={modalStyles.inputsForm} onChange={handleChangeAnswer} />
                                </FormControl>
                                <Box className={modalStyles.modalBtnGroup}>
                                    <Button onClick={handleEditClose} className={modalStyles.btnCancel} title={'Cancel'} disabled={appStatus ==="loading"}/>
                                    <Button className={modalStyles.btnSave} onClick={handleAddCard} title={'Add'} disabled={appStatus ==="loading"}/>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Container>
    );
};

export default CardDetails;