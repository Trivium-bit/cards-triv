import React from 'react';
import { v4 } from 'uuid';
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
import s from './AllTable.module.scss'

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
    {_id: v4(), name: "Pack name bla bla", cards: 4, lastUpdate: "21.02.21", createdBy: "Marina"},
    {_id: v4(),name: "Pack name bla", cards: 4, lastUpdate: "21.02.21", createdBy: "vitali"},
    {_id: v4(),name: "Pack name bbbla", cards: 4, lastUpdate: "21.02.21", createdBy: "dmitrii"},
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