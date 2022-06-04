import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {
    Box,
    Container,
    Input,
    InputAdornment,
    Paper, Rating,
    styled, Table, TableBody,
    TableCell,
    tableCellClasses, TableContainer, TableHead,
    TableRow
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import {v4} from "uuid";

import s from './styles/CardDetails.module.scss'
import styles from './MyPacks/MyTable.module.scss'

//type
type CardPropsType = {
    _id: string
    question: string
    answer: string
    lastUpdate: string
}
const cards: CardPropsType[] = [
    {_id:v4(), question: "How This works in JavaScript?", answer: "Its Works bla bla", lastUpdate: "21.02.21"},
    {_id:v4(), question: "Second question?", answer: "Its Works bla bla", lastUpdate: "21.02.21"},
]

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

//component
const CardDetails = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number | null>(2);


    return (
        <Container fixed >
            <Box className={s.packDetailBlock}>
                <Box className={s.nav} onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                    <span className={s.title} >Pack name</span>
                </Box>
                <Box className={s.inputSearch}>
                    <Input
                        placeholder={"Search..."}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
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
                                            <StyledTableCell align="left">{card.lastUpdate}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Rating
                                                    size="small"
                                                    value={rating}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <div className={styles.buttonGroup}>
                                                    <button className={styles.delete}>Delete</button>
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

                </Box>


            </Box>
        </Container>
    );
};

export default CardDetails;