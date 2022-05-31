import React from 'react';
import {
    Button,
    Paper,
    Stack,
    styled,
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

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
                        <StyledTableCell align="right">Actions</StyledTableCell>
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
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined">Delete</Button>
                                    <Button variant="outlined">Edit</Button>
                                    <Button variant="outlined">Learn</Button>
                                </Stack>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;