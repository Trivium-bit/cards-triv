import React, {useEffect, useMemo, useState} from 'react';
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
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    myCardsPaginationSelector,
    myCardsSelector, userIdSelector
} from "../../../../../Common/Selectors/Selectors";
import {getAllCardsPacksTC} from "../../../../../state/cardsReducer";
import {CardPackType} from "../../../../../api/cardsAPI";
import {useAppSelector} from "../../../../../state/store";


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
const AllTable = () => {
    const myId = useAppSelector<string>(userIdSelector);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const myCards = useSelector(myCardsSelector);
    const myCardsPagination = useSelector(myCardsPaginationSelector);
    const [question, setQuestion] = useState("My question is bla?");
    const [answer, setAnswer] = useState("My answer is bla bla");
    const [rowToDelete, setRowToDelete] = useState<CardPackType | undefined>(undefined);
    const [openAnswer, setOpenAnswer] = useState<CardPackType | undefined>(undefined);
    const [openLearn, setOpenLearn] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };
    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };
    const handleOpenDelete = (card: CardPackType) => setRowToDelete(card);
    const handleCloseDelete = () => setRowToDelete(undefined);
    const handleOpenAnswer = (card: CardPackType) => setOpenAnswer(card);
    const handleCloseAnswer = () => setOpenAnswer(undefined);
    const handleOpenLearn = () => setOpenLearn(true);
    const handleCloseLearn = () => {
        setOpenAnswer(undefined);
        setOpenLearn(false);
    };

    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        navigate(`/packs?page=${page}`)
    }

    useEffect(() => {
        dispatch(getAllCardsPacksTC(currentPage))
    }, [currentPage, dispatch]);
    return (
        <Box className={s.wrapper}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="left">Cards</StyledTableCell>
                            <StyledTableCell align="left">Last Updates</StyledTableCell>
                            <StyledTableCell align="left">Created By</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={s.tableBody}>
                        {
                            myCards.map((card => card.user_id !== myId
                                ?
                                <StyledTableRow key={card._id}>
                                    <StyledTableCell component="th" scope="row">{card.name}</StyledTableCell>
                                    <StyledTableCell align="left">{card.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="left">{card.updated}</StyledTableCell>
                                    <StyledTableCell align="left">{card.user_name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className={s.buttonGroup}>
                                            <button onClick={() => handleOpenAnswer(card)} className={s.main}>Learn
                                            </button>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                                :
                                <StyledTableRow key={card._id}>
                                    <StyledTableCell component="th" scope="row">{card.name}</StyledTableCell>
                                    <StyledTableCell align="left">{card.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="left">{card.updated}</StyledTableCell>
                                    <StyledTableCell align="left">{card.user_name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className={s.buttonGroup}>
                                            <button onClick={() => handleOpenDelete(card)} className={s.delete}>Delete</button>
                                            <button onClick={handleOpenEdit} className={s.main}>Edit</button>
                                            <button onClick={() => handleOpenAnswer(card)} className={s.main}>Learn</button>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>))

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
                    <h1 className={modalStyles.modalTitle}>Delete Pack</h1>
                    <Box>
                        <span className={modalStyles.modalText}>Do you really want to remove
                            <b> {rowToDelete?.name}</b>?
                            All cards will be excluded from this course
                        </span>
                    </Box>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseDelete} className={modalStyles.btnCancel} title={'Cancel'}/>
                        <Button className={modalStyles.btnSave} title={'Save'}/>
                    </Box>
                </Box>
            </Modal>

            {/*Edit Modal*/}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock}>
                    <h1 className={modalStyles.modalTitle}>Card Info</h1>
                    <Box>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Question</InputLabel>
                            <Input className={modalStyles.inputsForm} id="component-simple" value={question}
                                   onChange={handleChangeQuestion}/>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Answer</InputLabel>
                            <Input className={modalStyles.inputsForm} id="component-simple" value={answer}
                                   onChange={handleChangeAnswer}/>
                        </FormControl>
                        <Box className={modalStyles.modalBtnGroup}>
                            <Button onClick={handleCloseEdit} className={modalStyles.btnCancel} title={'Cancel'}/>
                            <Button className={modalStyles.btnSave} title={'Save'}/>
                        </Box>
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
};

export default AllTable;