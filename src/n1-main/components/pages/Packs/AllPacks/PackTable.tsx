import React, {useEffect, useState} from 'react';
import {
    Box, Pagination,
    Paper,
    IconButton,
    Popover,
    styled,
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import s from './AllTable.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {
    myCardsPacksSelector,
    userIdSelector,
    isMyTableSelector,
    minSelector,
    maxSelector,
    searchPackNameSelector,
    cardPacksCurrentPageSelector, sortCardPacksSelector, totalCardPacksPageCountSelector,
} from "../../../../../Common/Selectors/Selectors";
import {
    CardPackUpdateRequestType,
    getCardsPacksTC, setCardPackCurrentPageAC,
} from "../../../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../../../state/store";
import {PacksResponseType} from "../../../../../api/cardPacksAPI";
import {useDebounce} from "use-debounce";
import {PATH} from "../../../AppRoutes";
import {debounceDelay} from "../../../Slider/Slider";
import {UniversalHeader} from "./universalHeader";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import moment from "moment/moment";
import {DeleteModalContainer} from "../../../Modals/DeleteModalContainer";
import {EditAddModalContainer} from "../../../Modals/EditAddModalContainer";
import {LearnModalContainer} from "../../../Modals/LearnModalContainer";
import {maxCardPackNameLength} from "../PacksHeader";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';


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
        height: 29,
        maxHeight: 30,
        boxSizing: "border-box",

    },
}));


const StyledTableRow = styled(TableRow)(() => ({

    '&:nth-of-type(odd)': {
        backgroundColor: "#F8F7FD",
    },
    "&:hover": {
        backgroundColor: "#ECECF9",
        cursor: "pointer"
    }
}));
export const modalStyle = {
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

//table
export const PackTable = React.memo(() => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const searchingPackName = useAppSelector<string>(searchPackNameSelector);
    const isMyTable = useAppSelector<boolean>(isMyTableSelector);
    const min = useAppSelector<number>(minSelector);
    const max = useAppSelector<number>(maxSelector);
    const myId = useAppSelector<string>(userIdSelector);
    const myCardPacks = useAppSelector(myCardsPacksSelector);
    const sortPacks = useAppSelector<string>(sortCardPacksSelector);
    const [debounceLocalPackName] = useDebounce(searchingPackName, debounceDelay);
    const totalCardPacksPageCount = useAppSelector<number>(totalCardPacksPageCountSelector);
    const currentPage = useAppSelector<number>(cardPacksCurrentPageSelector)

    const [rowToDelete, setRowToDelete] = useState<PacksResponseType | undefined>(undefined);
    const [rowToUpdate, setRowToUpdate] = useState<CardPackUpdateRequestType | undefined>(undefined);
    const [rowToLearn, setRowToLearn] = useState<PacksResponseType | undefined>(undefined);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpenEdit = (cardPack: CardPackUpdateRequestType | undefined) => setRowToUpdate(cardPack);
    const handleOpenDelete = (cardPack: PacksResponseType | undefined) => setRowToDelete(cardPack);
    const handleOpenLearn = (cardPack: PacksResponseType | undefined) => setRowToLearn(cardPack);
    const handleChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCardPackCurrentPageAC(page))
        dispatch(getCardsPacksTC())
    }
    const navigateToCardsPage = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>, cardPack: PacksResponseType) => {
        navigate(`${PATH.PACKS}/${cardPack._id}`)

    }

    useEffect(() => {
        dispatch(setCardPackCurrentPageAC(1))
        dispatch(getCardsPacksTC())
    }, [dispatch, isMyTable, debounceLocalPackName, min, max, sortPacks]);

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={s.wrapper}>
            {myCardPacks.length !== 0 ?
                <TableContainer className={s.table} component={Paper} variant={"outlined"} >
                    <Table  aria-label="customized table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell align="left">
                                    <TableSortLabel active={sortPacks === "0name" || sortPacks === "1name"}
                                                    direction={sortPacks === "0name" ? "asc" : "desc"}
                                                    IconComponent={ArrowDropUpIcon}>
                                        <UniversalHeader headerValue={"Name"} sortedValue={"name"}/>
                                    </TableSortLabel>
                                </StyledTableCell>

                                <StyledTableCell align="left">
                                    <TableSortLabel active={sortPacks === "0cardsCount" || sortPacks === "1cardsCount"}
                                                    direction={sortPacks === "0cardsCount" ? "asc" : "desc"}
                                                    IconComponent={ArrowDropUpIcon}>
                                        <UniversalHeader headerValue={"Cards"} sortedValue={"cardsCount"}/>
                                    </TableSortLabel>
                                </StyledTableCell>

                                <StyledTableCell align="left" className={s.hideForMobile}>
                                    <TableSortLabel
                                        active={sortPacks === "0updated" || sortPacks === "1updated"}
                                        direction={sortPacks === "0updated" ? "asc" : "desc"}
                                        IconComponent={ArrowDropUpIcon}>
                                        <UniversalHeader headerValue={"Last Updated"} sortedValue={"updated"}/>
                                    </TableSortLabel>

                                </StyledTableCell>
                                <StyledTableCell align="left" className={s.hideForMobile}>
                                    <TableSortLabel active={sortPacks === "0user_name" || sortPacks === "1user_name"}
                                                    direction={sortPacks === "0user_name" ? "asc" : "desc"}
                                                    IconComponent={ArrowDropUpIcon}>
                                        <UniversalHeader headerValue={"Created by"} sortedValue={"user_name"}/>
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className={s.tableBody}>
                            {
                                myCardPacks.map((cardPack =>
                                        <StyledTableRow key={cardPack._id}>
                                            <StyledTableCell  align="left"
                                                             component="th" scope="row"
                                                             onClick={(e) => navigateToCardsPage(e, cardPack)}>
                                                <NavLink to={`${PATH.PACKS}/${cardPack._id}`}>
                                                    {cardPack.name.slice(0, maxCardPackNameLength)}
                                                </NavLink>
                                            </StyledTableCell>

                                            <StyledTableCell
                                                             align="left"
                                                             onClick={(e) => navigateToCardsPage(e, cardPack)}>
                                                {cardPack.cardsCount}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" className={s.hideForMobile}
                                                             onClick={(e) => navigateToCardsPage(e, cardPack)}>
                                                {moment(cardPack.updated).format("DD.MM.YYYY HH:mm:ss")}
                                            </StyledTableCell>

                                            <StyledTableCell align="left"
                                                             onClick={(e) => navigateToCardsPage(e, cardPack)}
                                                             className={s.hideForMobile}>
                                                {cardPack.user_name.slice(0, 45)}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" className={s.actions}>
                                                <Box className={s.mobileButtonGroup}>
                                                    <IconButton onClick={handlePopoverClick}>
                                                        <InfoOutlinedIcon className={s.iconInfo}/>
                                                    </IconButton>
                                                    <IconButton className={cardPack.cardsCount === 0 ? s.iconLearn : s.iconDisabled}
                                                                onClick={() => handleOpenLearn(cardPack)} disabled={cardPack.cardsCount === 0}>
                                                        <SchoolOutlinedIcon className={s.iconLearn} />
                                                    </IconButton>
                                                    {cardPack.user_id === myId && (
                                                        <>
                                                            <IconButton onClick={() => handleOpenEdit(cardPack)}>
                                                                <EditOutlinedIcon className={s.iconEdit} />
                                                            </IconButton>
                                                            <IconButton onClick={() => handleOpenDelete(cardPack)}>
                                                                <DeleteSweepOutlinedIcon className={s.iconDelete}/>
                                                            </IconButton>
                                                        </>
                                                    )}
                                                    <Popover
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handlePopoverClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        className={s.popover}
                                                    >
                                                        <div className={s.popoverDiv}>
                                                            <p className={s.popoverTitle}>Created by: </p>
                                                            <span>{cardPack.user_name.slice(0, 45)}</span>
                                                            <p className={s.popoverTitle}>Last Updated:</p>
                                                            <span>{moment(cardPack.updated).format("DD.MM.YYYY HH:mm:ss")}</span>
                                                        </div>
                                                    </Popover>
                                                </Box>
                                                <Box className={s.buttonGroup}>
                                                    <div className={s.learnBtnWrapper}>
                                                        <Button sx={{textTransform: "none"}} name="learn"
                                                               onClick={() => handleOpenLearn(cardPack)}
                                                               className={cardPack.cardsCount !== 0 ? s.learn : s.learnDisabled} disabled={cardPack.cardsCount === 0}>Learn
                                                        </Button>
                                                    </div>
                                                    {cardPack.user_id === myId && (
                                                        <>
                                                            <IconButton onClick={() => handleOpenEdit(cardPack)} size={"small"}>
                                                                <EditOutlinedIcon className={s.iconEdit}/>
                                                            </IconButton>
                                                            <IconButton onClick={() => handleOpenDelete(cardPack)} size={"small"}>
                                                                <DeleteSweepOutlinedIcon className={s.iconDelete}/>
                                                            </IconButton>
                                                        </>
                                                    )}

                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                ))

                            }


                        </TableBody>
                    </Table>
                </TableContainer>
                :
                (
                    <div className={s.emptyPack}>
                                <p className={s.emptyText}>
                                    You don't have cards pack. Click "Add new card pack" to create a new card pack or go to all card packs
                                </p>
                    </div>
                )
            }
            {totalCardPacksPageCount > 1 &&
            <Pagination onChange={handleChangePagination} count={totalCardPacksPageCount} page={currentPage}
                        shape="rounded"/>}

            <DeleteModalContainer styles={modalStyle} pack={rowToDelete} closeModalCallback={setRowToDelete}/>
            <EditAddModalContainer styles={modalStyle} pack={rowToUpdate} closeModalCallback={setRowToUpdate}/>
            <LearnModalContainer styles={modalStyle} pack={rowToLearn} closeModalCallback={setRowToLearn}/>

        </Box>


    );
});
