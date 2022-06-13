import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    Box,
    Container, FormControl,
    FormHelperText,
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
import moment from "moment";
import s from './styles/CardDetails.module.scss'
import styles from './AllPacks/AllTable.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {useSelector} from "react-redux";
import {
    appStatusSelector, cardFilterAnswerSelector, cardFilterQuestionSelector, cardPaginationSelector,
    getCardsSelector
} from "../../../../Common/Selectors/Selectors";
import {
    addNewCardTC,
    deleteCardTC,
    editCardTC,
    getCardsTC,
    setFilterAnswerAC,
    setFilterQuestionAC
} from "../../../../state/cardsReducer";
import Button from "../../../../Common/Components/Button";
import modalStyles from "./styles/ModalStyles.module.scss";
import {RequestStatusType} from "../../../../state/app-reducer";
import {GetCardsParams, PackCardType} from "../../../../api/cardAPI";

type NewCardPayloadType = {
    answer: string;
    question: string;
}
type EditCardPayloadType = {
    answer: string;
    question: string;
}
type ErrorStateType = {
    answer?: string;
    question?: string;
}


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
    const delaySetAnswerRef = useRef<any>();
    const delaySetQuestionRef = useRef<any>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {packId} = useParams();
    const cards = useSelector(getCardsSelector);
    const filterQuestion = useSelector(cardFilterQuestionSelector);
    const filterAnswer = useSelector(cardFilterAnswerSelector);
    const cardPagination = useSelector(cardPaginationSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<PackCardType | undefined>(undefined);
    const [newCardPayload, setNewCardPayload] = useState<NewCardPayloadType>({
        answer: "",
        question: ""
    });
    const [editCardPayload, setEditCardPayload] = useState<EditCardPayloadType>({
        answer: "",
        question: ""
    });
    const [addErrors, setAddErrors] = useState<ErrorStateType>({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAddErrors({});
        setNewCardPayload({
            answer: "",
            question: ""
        })
    };
    const handleEditOpen = (row: any) => setEditOpen(row);
    const handleEditClose = () => setEditOpen(undefined);

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    useEffect(() => {

        const payload: GetCardsParams = {
            cardsPack_id: packId,
            page: currentPage
        }

        if (filterAnswer !== "") {
            payload.cardAnswer = filterAnswer
        }
        if (filterQuestion !== "") {
            payload.cardQuestion = filterQuestion
        }

        dispatch(getCardsTC(payload))
    }, [currentPage, filterAnswer, filterQuestion])

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        navigate(`/packs/${packId}?page=${page}`)
    }

    const handleAddCard =() => {
        if (newCardPayload.question !== "" && newCardPayload.answer !== "") {
            dispatch(addNewCardTC( packId || '', {
                question: newCardPayload.question,
                answer: newCardPayload.answer
            }, () => {
                handleClose();
                dispatch(getCardsTC({
                    cardsPack_id: packId,
                    page: currentPage
                }))
            }))
        } else {
            const errors: ErrorStateType = {};
            if (newCardPayload.answer === "") {
                errors.answer = "Please type your answer"
            }

            if (newCardPayload.question === "") {
                errors.question = "Please type your question"
            }

            setAddErrors(errors);
        }
    }
    const handleChangeQuestion =(e:React.ChangeEvent<HTMLInputElement>) => {
        setNewCardPayload(payload => ({...payload, question: e.target.value}))
        setAddErrors(errors => ({...errors, question: undefined}))
    }
    const handleChangeAnswer =(e:React.ChangeEvent<HTMLInputElement>) => {
        setNewCardPayload(payload => ({...payload, answer: e.target.value}))
        setAddErrors(errors => ({...errors, answer: undefined}))
    }
    const handleChangeEditQuestion =(e:React.ChangeEvent<HTMLInputElement>) => {
        setEditCardPayload(payload => ({...payload, question: e.target.value}))
        setAddErrors(errors => ({...errors, question: undefined}))
    }
    const handleChangeEditAnswer =(e:React.ChangeEvent<HTMLInputElement>) => {
        setEditCardPayload(payload => ({...payload, answer: e.target.value}))
        setAddErrors(errors => ({...errors, answer: undefined}))
    }

    const handleCardDelete = (id: any) => {
        dispatch(deleteCardTC(id, () => {
            dispatch(getCardsTC({
                cardsPack_id: packId,
                page: currentPage
            }))
        }))
    }
    const onChangeQuestionHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        clearTimeout(delaySetQuestionRef.current)
        delaySetQuestionRef.current = setTimeout(() => {
            dispatch(setFilterQuestionAC(value))
        }, 1000)
    }
    const onChangeAnswerHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const value = e.currentTarget.value;
        clearTimeout(delaySetAnswerRef.current)
        delaySetAnswerRef.current = setTimeout(() => {
            dispatch(setFilterAnswerAC(value))
        }, 1000)
    }

    const updateCard = () => {
        if(editOpen && editOpen._id)  {
            dispatch(editCardTC(editOpen._id,
                editCardPayload.answer,
                editCardPayload.question,
                () => {
                handleEditClose();
                    dispatch(getCardsTC({
                        cardsPack_id: packId,
                        page: currentPage
                    }))
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
                        onChange={onChangeQuestionHandler}
                        placeholder={"Search question..."}
                        startAdornment={
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Input
                        onChange={onChangeAnswerHandler}
                        placeholder={"Search answer..."}
                        startAdornment={
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Button className={s.btn} title={'Add new card'} onClick={handleOpen} />
                </Box>
                <Box>
                    <Box className={s.wrapper}>
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
                                                <StyledTableCell align="left">{moment(card.created).format("DD-MM-YYYY HH:mm:ss")}</StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <Rating
                                                        readOnly
                                                        size="small"
                                                        value={card.rating}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <div className={styles.buttonGroup}>
                                                        <button className={styles.delete} onClick={() => handleCardDelete(card._id)}>Delete</button>
                                                        <button className={styles.edit} onClick={() => handleEditOpen(card)}>Edit</button>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
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
                                    <FormControl  variant="standard">
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
                                    <FormControl error={!!addErrors.question} variant="standard">
                                        <InputLabel htmlFor="component-simple">Question</InputLabel>
                                        <Input className={modalStyles.inputsForm} onChange={handleChangeQuestion} />
                                        {addErrors.question && (
                                            <FormHelperText id="component-error-text">{addErrors.question}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl error={!!addErrors.answer} variant="standard">
                                        <InputLabel htmlFor="component-simple">Answer</InputLabel>
                                        <Input className={modalStyles.inputsForm} onChange={handleChangeAnswer} />
                                        {addErrors.answer && (
                                            <FormHelperText id="component-error-text">{addErrors.answer}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <Box className={modalStyles.modalBtnGroup}>
                                        <Button onClick={handleClose} className={modalStyles.btnCancel} title={'Cancel'} disabled={appStatus ==="loading"}/>
                                        <Button className={modalStyles.btnSave} onClick={handleAddCard} title={'Add'} disabled={appStatus ==="loading"}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
                <Pagination onChange={handleChangePagination} count={cardPagination.count}  page={cardPagination.current} shape="rounded" />

            </Box>
        </Container>
    );
};

export default CardDetails;