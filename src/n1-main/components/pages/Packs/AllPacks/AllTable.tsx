import React, {useState} from 'react';
import { v4 } from 'uuid';
import {
    Box, FormControlLabel, Modal,
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

//types
type CardPropsType = {
    _id: string
    name:string
    cards: number
    lastUpdate: string
    createdBy: string
}

const cards: CardPropsType[]  = [
    {_id: v4(), name: "Marina's pack", cards: 4, lastUpdate: "21.02.21", createdBy: "Marina"},
    {_id: v4(),name: "Vitaly's pack", cards: 5, lastUpdate: "21.09.21", createdBy: "Vitali"},
    {_id: v4(),name: "Dmitry's pack", cards: 9, lastUpdate: "21.12.21", createdBy: "Dmitrii"},
]

//styles mui
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

//table
const MyTable = () => {
    const [openAnswer, setOpenAnswer] = useState<CardPropsType | undefined>(undefined);
    const [openLearn, setOpenLearn] = useState(false);

    const handleOpenAnswer = (card: CardPropsType) => setOpenAnswer(card);
    const handleCloseAnswer = () => setOpenAnswer(undefined);

    const handleOpenLearn = () => setOpenLearn(true);
    const handleCloseLearn = () => {
        setOpenAnswer(undefined);
        setOpenLearn(false);
    };
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="left">Cards</StyledTableCell>
                            <StyledTableCell align="left">Last Updates</StyledTableCell>
                            <StyledTableCell align="left">Created By</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card) => (
                            <StyledTableRow key={card.name}>
                                <StyledTableCell component="th" scope="row">
                                    {card.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{card.cards}</StyledTableCell>
                                <StyledTableCell align="left">{card.lastUpdate}</StyledTableCell>
                                <StyledTableCell align="left">{card.createdBy}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box className={s.buttonGroup}>
                                        <button onClick={() => handleOpenAnswer(card)} className={s.main}>Learn</button>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*// Show Answer Modal*/}
            <Modal
                open={!!openAnswer}
                onClose={handleCloseAnswer}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock }>
                    <h1 className={modalStyles.modalTitle}>{openAnswer?.name}</h1>
                    <p className={modalStyles.modalText}><b>Question:</b>“How "This" works in JavaScript?”</p>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleCloseAnswer} className={modalStyles.btnCancel} title={'Cancel'}/>
                        <Button onClick={handleOpenLearn} className={modalStyles.btnSave} title={'Show Answer'}/>
                    </Box>
                </Box>
            </Modal>


            {/*Learn Modal*/}
            <Modal
                open={openLearn}
                onClose={handleCloseLearn}
            >
                <Box sx={modalStyle} className={modalStyles.modalBlock }>
                    <h1 className={modalStyles.modalTitle}>Learn {openAnswer?.name}</h1>
                    <p className={modalStyles.modalText}><b>Question:</b>“How "This" works in JavaScript?”</p>
                    <p className={modalStyles.modalText}><b>Answer:</b>“This is how "This" works in JavaScript”</p>
                    <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Did you know" control={<Radio />} label="Did you know" />
                        <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
                        <FormControlLabel value="Confused" control={<Radio />} label="Confused" />
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

export default MyTable;