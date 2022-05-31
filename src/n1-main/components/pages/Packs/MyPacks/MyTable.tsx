import React from 'react';
import {
    Box,
    Paper,
    styled,
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import s from './MyTable.module.scss'

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
const rows = [
    { name: "Pack name", cards: 4, lastUpdate: "21.02.21", createdBy: "marina"},
    { name: "Pack name", cards: 4, lastUpdate: "21.02.21", createdBy: "marina"},
    { name: "Pack name", cards: 4, lastUpdate: "21.02.21", createdBy: "marina"},
]

const MyTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">Last Updates</StyledTableCell>
                        <StyledTableCell align="right">Created By</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.cards}</StyledTableCell>
                            <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
                            <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Box className={s.buttonGroup}>
                                    <button className={s.delete}>Delete</button>
                                    <button className={s.main}>Edit</button>
                                    <button className={s.main}>Learn</button>
                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;