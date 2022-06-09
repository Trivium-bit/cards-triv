import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
    appStatusSelector,
    getCardsSelector
} from "../../../../Common/Selectors/Selectors";
import {addNewCardTC, deleteCardTC, getCardsTC} from "../../../../state/cardsReducer";
import Button from "../../../../Common/Components/Button";
import modalStyles from "./styles/ModalStyles.module.scss";
import {RequestStatusType} from "../../../../state/app-reducer";


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
    const {packId} = useParams();
    const cards = useSelector(getCardsSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const [open, setOpen] = useState(false);
    const [inputQuestionValue, setInputQuestionValue] = useState('');
    const [inputAnswerValue, setInputAnswerValue] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getCardsTC(packId || ''))
    }, [dispatch, packId])

    const handleAddCard =() => {
        dispatch(addNewCardTC( packId || '',{
            question: inputQuestionValue,
            answer: inputAnswerValue
        }, () => {
            handleClose();
            dispatch(getCardsTC(packId || ''))
        }))
    }
    const handleChangeQuestion =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputQuestionValue(e.target.value)
    }
    const handleChangeAnswer =(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswerValue(e.target.value)
    }
    const handleCardDelete = (id: any) => {
        console.log(id)
        dispatch(deleteCardTC(id, () => {
            dispatch(getCardsTC(packId || ''))
        }))
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
                                                    <button className={styles.main}>Learn</button>
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
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
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
                                    <Button onClick={handleClose} className={modalStyles.btnCancel} title={'Cancel'} disabled={appStatus ==="loading"}/>
                                    <Button className={modalStyles.btnSave} onClick={handleAddCard} title={'Add'} disabled={appStatus ==="loading"}/>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Pagination shape="rounded" />
            </Box>
        </Container>
    );
};

export default CardDetails;