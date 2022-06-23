import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    Box,
    Button,
    Container, FormControl, IconButton,
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
    appStatusSelector, cardPaginationSelector,
    getCardsSelector
} from "../../../../Common/Selectors/Selectors";
import {
    addNewCardTC,
    editCardTC,
    getCardsTC,
    setFilterAnswerAC,
    setFilterQuestionAC
} from "../../../../state/cardsReducer";
import CustomButton from "../../../../Common/Components/Button";
import modalStyles from "../../Modals/ModalStyles.module.scss";
import {RequestStatusType} from "../../../../state/app-reducer";
import {GetCardsParams, PackCardType} from "../../../../api/cardAPI";
import {DeleteCardModalContainer} from "../../Modals/DeleteCardModalContainer";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {useDebounce} from "use-debounce";
import {debounceDelay} from "../../Slider/Slider";

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
const StyledTableCell = styled(TableCell)(() => ({
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
    boxShadow: 24 as unknown as 'BoxShadow | undefined',
    p: 4,
    borderRadius: 2,
};
export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#21268F',
    },

});
//component
const CardDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {packId} = useParams();
    const user_id = useAppSelector<string>(state => state.appReducer.user._id)
    const cards = useSelector(getCardsSelector);
    const cardPagination = useSelector(cardPaginationSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<PackCardType | undefined>(undefined);
    const [rowToDelete, setRowToDelete] = useState<PackCardType | undefined>(undefined);
    const question = useAppSelector(state => state.cardsReducer.question)
    const answer = useAppSelector(state => state.cardsReducer.answer)
    const [debounceQuestion] = useDebounce(question, debounceDelay);
    const [debounceAnswer] = useDebounce(answer, debounceDelay);
    const [newCardPayload, setNewCardPayload] = useState<NewCardPayloadType>({
        answer: "",
        question: ""
    });
    const [editCardPayload, setEditCardPayload] = useState<EditCardPayloadType>({
        answer: "",
        question: ""
    });
    const [addErrors, setAddErrors] = useState<ErrorStateType>({});
    const handleCloseDelete = () => setRowToDelete(undefined)
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

        if (debounceAnswer !== "") {
            payload.cardAnswer = debounceAnswer
        }
        if (debounceQuestion !== "") {
            payload.cardQuestion = debounceQuestion
        }

        dispatch(getCardsTC(payload))
    }, [dispatch, currentPage, debounceAnswer, debounceQuestion, packId])

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        navigate(`/packs/${packId}?page=${page}`)
    }
    const handleAddCard = () => {
        if (newCardPayload.question !== "" && newCardPayload.answer !== "") {
            dispatch(addNewCardTC(packId || '', {
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
    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCardPayload(payload => ({...payload, question: e.target.value}))
        setAddErrors(errors => ({...errors, question: undefined}))
    }
    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCardPayload(payload => ({...payload, answer: e.target.value}))
        setAddErrors(errors => ({...errors, answer: undefined}))
    }
    const handleChangeEditQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditCardPayload(payload => ({...payload, question: e.target.value}))
        setAddErrors(errors => ({...errors, question: undefined}))
    }
    const handleChangeEditAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditCardPayload(payload => ({...payload, answer: e.target.value}))
        setAddErrors(errors => ({...errors, answer: undefined}))
    }


    const openDeleteModal = (card: PackCardType) => setRowToDelete(card);

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterQuestionAC(e.target.value))
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterAnswerAC(e.target.value))
    }


    const updateCard = () => {
        if (editOpen && editOpen._id) {
            dispatch(editCardTC(editOpen._id,
                editCardPayload.question,
                editCardPayload.answer,
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
        <Container fixed>
            <Box className={s.packDetailBlock}>
                <Box className={s.nav} onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                    <span className={s.title}>Pack name</span>
                </Box>
                <Box className={s.headers}>
                    <TextField
                        className={s.questionInput}

                        onChange={onChangeQuestionHandler}
                        value={question}
                        placeholder={"Search question..."}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>,
                            endAdornment:
                                <InputAdornment position="end" style={{cursor: "pointer"}}
                                                onClick={ () => dispatch(setFilterQuestionAC(""))}>
                                    <CloseIcon/>
                                </InputAdornment>

                        }}
                    />
                    <TextField
                        className={s.answerInput}
                        fullWidth
                        onChange={onChangeAnswerHandler}
                        placeholder={"Search answer..."}
                        value={answer}
                        size="small"
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>,
                            endAdornment:
                                <InputAdornment position="end" style={{cursor: "pointer"}}
                                                onClick={ () =>  dispatch(setFilterAnswerAC(""))}>
                                    <CloseIcon/>
                                </InputAdornment>
                        }}
                    />
                    <Button sx={{textTransform: "none"}} className={s.btn} title={'Add new card'} onClick={handleOpen}>Add
                        new card</Button>
                </Box>
                <Box>
                    <Box className={s.wrapper}>
                        {cards.length !== 0 && (
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 700}} aria-label="customized table">
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
                                                <StyledTableCell component="th"
                                                                 scope="row">{card.question}</StyledTableCell>
                                                <StyledTableCell align="left">{card.answer}</StyledTableCell>
                                                <StyledTableCell
                                                    align="left">{moment(card.created).format("DD.MM.YYYY HH:mm:ss")}</StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <StyledRating
                                                        readOnly
                                                        size="small"
                                                        value={card.grade}
                                                        color={"red"}
                                                    />


                                                </StyledTableCell>


                                                <StyledTableCell align="right">
                                                    <div className={styles.buttonGroup}>
                                                        {/*<Button size={"small"} className={styles.delete} disabled={user_id !== card.user_id}
                                                                onClick={() => openDeleteModal(card)}>Delete
                                                        </Button>
                                                        <Button size={"small"} className={styles.edit} disabled={user_id !== card.user_id}
                                                                onClick={() => handleEditOpen(card)}>Edit
                                                        </Button>*/}
                                                        <IconButton onClick={() => handleEditOpen(card)}
                                                                    disabled={user_id !== card.user_id}>
                                                            <EditOutlinedIcon
                                                                className={user_id === card.user_id ? styles.iconEdit : ""}/>
                                                        </IconButton>
                                                        <IconButton onClick={() => openDeleteModal(card)}
                                                                    disabled={user_id !== card.user_id}>
                                                            <DeleteSweepOutlinedIcon
                                                                className={user_id === card.user_id ? styles.iconDelete : ""}/>
                                                        </IconButton>
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
                                        <Input defaultValue={editOpen?.question} className={modalStyles.inputsForm}
                                               onChange={handleChangeEditQuestion}/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="component-simple">Edit answer</InputLabel>
                                        <Input defaultValue={editOpen?.answer} className={modalStyles.inputsForm}
                                               onChange={handleChangeEditAnswer}/>
                                    </FormControl>
                                    <Box className={modalStyles.modalBtnGroup}>
                                        <CustomButton onClick={handleEditClose} className={modalStyles.btnCancel}
                                                      title={'Cancel'} disabled={appStatus === "loading"}/>
                                        <CustomButton className={modalStyles.btnSave} onClick={updateCard}
                                                      title={'Save'}
                                                      disabled={appStatus === "loading"}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <Box sx={modalStyle} className={modalStyles.modalBlock}>
                                <h1 className={modalStyles.modalTitle}>Add a new card</h1>
                                <Box>
                                    <TextField multiline className={modalStyles.inputsForm}
                                               placeholder={"Type your question"}
                                               label="Question"
                                               onChange={handleChangeQuestion} error={!!addErrors.question}
                                               helperText={addErrors.question}/>
                                    <TextField multiline className={modalStyles.inputsForm}
                                               placeholder={"Type your answer"}
                                               onChange={handleChangeAnswer} error={!!addErrors.answer}
                                               helperText={addErrors.answer} label="Answer"/>
                                </Box>
                                <Box>
                                    <Box className={modalStyles.modalBtnGroup}>
                                        <Button sx={{textTransform: "none"}} onClick={handleClose}
                                                className={modalStyles.btnCancel} title={'Cancel'}>Cancel</Button>
                                        <Button sx={{textTransform: "none"}} className={modalStyles.btnSave}
                                                onClick={handleAddCard} title={'Add'}>Add</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                </Box>

                <DeleteCardModalContainer card={rowToDelete} deleteCallback={handleCloseDelete} styles={modalStyle}/>
                <Pagination onChange={handleChangePagination} count={cardPagination.count} page={cardPagination.current}
                            shape="rounded"/>

            </Box>
        </Container>
    );
};

export default CardDetails;