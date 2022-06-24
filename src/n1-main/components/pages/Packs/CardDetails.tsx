import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    Box,
    Button,
    Container, IconButton,
    InputAdornment, Pagination,
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
    cardPaginationSelector,
    getCardsSelector
} from "../../../../Common/Selectors/Selectors";
import {
    getCardsTC,
    setFilterAnswerAC,
    setFilterQuestionAC
} from "../../../../state/cardsReducer";

import {GetCardsParams, PackCardType} from "../../../../api/cardAPI";
import {DeleteCardModalContainer} from "../../Modals/DeleteCardModalContainer";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {useDebounce} from "use-debounce";
import {debounceDelay} from "../../Slider/Slider";
import {modalStyle} from "./AllPacks/PackTable";
import {EditAddCardModal} from "../../Modals/EditAddCardModal";
import {PATH} from "../../AppRoutes";


//mui table styles
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",
        fontWeight: 600,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        wordBreak: "break-word",
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#F8F7FD",

    },
}));

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

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<PackCardType | undefined>(undefined);
    const [rowToDelete, setRowToDelete] = useState<PackCardType | undefined>(undefined);
    const cards = useSelector(getCardsSelector);
    const cardPagination = useSelector(cardPaginationSelector);
    const question = useAppSelector(state => state.cardsReducer.question);
    const answer = useAppSelector(state => state.cardsReducer.answer);
    const user_id = useAppSelector<string>(state => state.appReducer.user._id);
    const [debounceQuestion] = useDebounce(question, debounceDelay);
    const [debounceAnswer] = useDebounce(answer, debounceDelay);

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    const handleAddModalOpen = () => setOpen(true);
    const handleEditModalOpen = (card: PackCardType) => setEditOpen(card);
    const handleCloseDelete = () => setRowToDelete(undefined);

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
    }, [dispatch, currentPage, debounceAnswer, debounceQuestion, packId]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        navigate(`/packs/${packId}?page=${page}`);
    }
    const openDeleteModal = (card: PackCardType) => setRowToDelete(card);
    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterQuestionAC(e.target.value))
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterAnswerAC(e.target.value))
    }
    const returnToPackPage = () => navigate(`${PATH.PACKS}`);

    return (
        <Container fixed>
            <Box className={s.packDetailBlock}>
                <Box className={s.nav} onClick={returnToPackPage}>
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
                                                onClick={() => dispatch(setFilterQuestionAC(""))}>
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
                                                onClick={() => dispatch(setFilterAnswerAC(""))}>
                                    <CloseIcon/>
                                </InputAdornment>
                        }}
                    />
                    <Button sx={{textTransform: "none"}} className={s.btn} title={'Add new card'} onClick={handleAddModalOpen}>Add
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
                                                        <IconButton onClick={() => handleEditModalOpen(card)}
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
                        <Pagination onChange={handleChangePagination} count={cardPagination.count} page={cardPagination.current}
                                    shape="rounded"/>
                    </Box>
                </Box>
            </Box>
            <EditAddCardModal currentPage={currentPage} packId={packId} closeEditModalCallback={setEditOpen}
                              card={editOpen}
                              closeAddModalCallback={setOpen}
                              showAddModal={open}/>
            <DeleteCardModalContainer card={rowToDelete} deleteCallback={handleCloseDelete} styles={modalStyle}/>

        </Container>

    );
};

export default CardDetails;