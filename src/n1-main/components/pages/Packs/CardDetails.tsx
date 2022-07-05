import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    Box,
    Button,
    Container, IconButton,
    InputAdornment, Pagination,
    Paper, Popover, Rating,
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
import {EditAddCardModalContainer} from "../../Modals/EditAddCardModalContainer";
import {PATH} from "../../AppRoutes";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


//mui table styles
const StyledTableCell = styled(TableCell)((theme) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
        color: "#000",


        ["@media (max-height:800px)"]: {
            display: theme.className === s.hideForMobile ? "none" : "",
        }
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        padding: 12.5,
        wordBreak:"break-word",
        maxWidth: '350px',
        height: 34,

        ["@media (max-height:800px)"]: {
            display: theme.className === s.hideForMobile ? "none" : "",
            height: 14,
        },
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
    const [currentCard, setCurrentCard] = useState<PackCardType | null>(null);
    const [rowToDelete, setRowToDelete] = useState<PackCardType | null>(null);
    const cards = useSelector(getCardsSelector);
    const cardPagination = useSelector(cardPaginationSelector);
    const question = useAppSelector(state => state.cardsReducer.question);
    const answer = useAppSelector(state => state.cardsReducer.answer);
    const user_id = useAppSelector<string>(state => state.appReducer.user._id);
    const [debounceQuestion] = useDebounce(question, debounceDelay);
    const [debounceAnswer] = useDebounce(answer, debounceDelay);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const openPopover = Boolean(anchorEl);

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    const handleAddModalOpen = () => setOpen(true);
    const handleEditModalOpen = (card: PackCardType) => setCurrentCard(card);
    const handleCloseDelete = () => setRowToDelete(null);

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

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container fixed className={s.cardDetailsMain}>
            <Box className={s.packDetailBlock}>
                <Box className={s.nav}
                     onClick={returnToPackPage}>
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
                    <Button sx={{textTransform: "none"}}
                            className={s.btn}
                            title={'Add new card'}
                            onClick={handleAddModalOpen}>
                        Add new card
                    </Button>
                </Box>

                <Box className={s.cardTableWrapper}>
                    {cards.length !== 0 && (
                        <TableContainer component={Paper} variant={"outlined"}>
                            <Table aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell>Question</StyledTableCell>
                                        <StyledTableCell align="left">Answer</StyledTableCell>
                                        <StyledTableCell align="left" className={s.hideForMobile}>Last
                                            Updates</StyledTableCell>
                                        <StyledTableCell align="left"
                                                         className={s.hideForMobile}>Grade</StyledTableCell>
                                        <StyledTableCell align="left">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cards.map((card) => (
                                        <StyledTableRow key={card._id}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row">
                                                {card.question}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left">
                                                {card.answer}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                className={s.hideForMobile}>
                                                {moment(card.created).format("DD.MM.YYYY HH:mm:ss")}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                className={s.hideForMobile}>
                                                <StyledRating
                                                    readOnly
                                                    size="small"
                                                    value={card.grade}
                                                    color={"red"}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Box className={s.mobileButtonGroup}>
                                                    <IconButton onClick={handlePopoverClick}>
                                                        <InfoOutlinedIcon className={s.iconInfo}/>
                                                    </IconButton>
                                                    {user_id === card.user_id && (
                                                        <>
                                                            <IconButton onClick={() => handleEditModalOpen(card)}>
                                                                <EditOutlinedIcon className={s.iconEdit}/>
                                                            </IconButton>
                                                            <IconButton onClick={() => openDeleteModal(card)}>
                                                                <DeleteSweepOutlinedIcon className={s.iconDelete}/>
                                                            </IconButton>
                                                        </>
                                                    )}
                                                    <Popover
                                                        open={openPopover}
                                                        anchorEl={anchorEl}
                                                        onClose={handlePopoverClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        className={s.popover}
                                                    >
                                                        <div className={s.popoverDiv}>
                                                            <p className={s.popoverTitle}>Rating: </p>
                                                            <StyledRating
                                                                readOnly
                                                                size="small"
                                                                value={card.grade}
                                                                color={"red"}
                                                            />
                                                            <p className={s.popoverTitle}>Last Updated:</p>
                                                            <span>{moment(card.created).format("DD.MM.YYYY HH:mm:ss")}</span>
                                                        </div>
                                                    </Popover>
                                                </Box>
                                                <div className={styles.buttonGroup}>
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
                </Box>
                <Pagination onChange={handleChangePagination} count={cardPagination.count} page={cardPagination.current}
                            shape="rounded"/>
            </Box>

            <EditAddCardModalContainer currentPage={currentPage} packId={packId} closeEditModalCallback={setCurrentCard}
                                       card={currentCard}
                                       closeAddModalCallback={setOpen}
                                       showAddModal={open}/>
            <DeleteCardModalContainer card={rowToDelete} deleteCallback={handleCloseDelete} styles={modalStyle}/>

        </Container>

    );
};

export default CardDetails;