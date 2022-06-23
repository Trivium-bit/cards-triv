import React, {ChangeEvent, useState} from 'react';
import {
    Box, Button,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import s from './styles/PackHeader.module.scss'
import {setIsPrivateCardPackAC, setLocalCardPackNameAC} from "../../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {modalStyle} from "./AllPacks/PackTable";
import {EditAddModalContainer} from "../../Modals/EditAddModalContainer";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';

type PacksHeaderPropsType = {
    packsOwnerName?: string
}

export const maxCardPackNameLength = 26;
const PacksHeader: React.FC<PacksHeaderPropsType> = ({packsOwnerName}) => {
    const [open, setOpen] = useState(false);
    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(setIsPrivateCardPackAC(false));
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        dispatch(setLocalCardPackNameAC(e.currentTarget.value))
    }

    const spitName = () => {
        const spitedName = packsOwnerName?.split(" ");
        if (spitedName) {
            return `${spitedName[0]}'s`
        }
    }
    const onclickHandler = () =>{
        dispatch(setLocalCardPackNameAC(""));
    }

    return (
        <Box className={s.packHeaderBlock}>
            {packsOwnerName
                ? <h1 className={s.title}>{`${spitName()} Pack list`}</h1>
                : <h1 className={s.title}>Packs list</h1>
            }
            <Box className={s.elements}>
                <TextField className={s.input} onChange={onChangeHandler}
                       fullWidth
                       value={localPackName}
                       placeholder={"Search..."}
                       size="small"
                       InputProps={{
                           startAdornment:
                           <InputAdornment position="start">
                                <SearchIcon/>
                           </InputAdornment>,
                           endAdornment:
                               <InputAdornment position="end" style={{cursor:"pointer"}} onClick={onclickHandler}>
                                   <CloseIcon/>
                               </InputAdornment>
                       }}
                />
                <Button sx={{textTransform: "none"}}
                    onClick={handleOpen}
                    className={s.addBtn}
                    title={'Add a new card pack'}>Add a new card pack</Button>
                <EditAddModalContainer showAddNewPackModal={open} closeModalCallback={handleClose} styles={modalStyle}/>
            </Box>

        </Box>
    );
};

export default PacksHeader;