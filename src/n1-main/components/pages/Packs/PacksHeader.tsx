import React, {ChangeEvent, useState} from 'react';
import {Box, Checkbox, FormControl, FormHelperText, Input, InputAdornment, InputLabel} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../../../../Common/Components/Button";
import modalStyles from "../../Modals/ModalStyles.module.scss";
import s from './styles/PackHeader.module.scss'
import {addNewCardPackTC, setIsPrivateCardPackAC, setLocalCardPackNameAC} from "../../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {useSearchParams} from "react-router-dom";
import {UniversalModal} from "../../Modals/UniversalModal";
import {modalStyle} from "./AllPacks/PackTable";
import FormControlLabel from "@mui/material/FormControlLabel";


type PacksHeaderPropsType = {
    packsOwnerName?: string
}


const PacksHeader: React.FC<PacksHeaderPropsType> = ({packsOwnerName}) => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isPrivate = useAppSelector<boolean>(state => state.cardPacksReducer.isPrivate);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAddErrors('');
    };
    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const [addErrors, setAddErrors] = useState('');


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{

        dispatch(setLocalCardPackNameAC(e.currentTarget.value))
    }
    const spitName = () => {
        const spitedName = packsOwnerName?.split(" ");
        if (spitedName) {
            return `${spitedName[0]}'s`
        }
    }
    const onchangePrivate = () =>{
        dispatch(setIsPrivateCardPackAC(!isPrivate))
    }
    const currentPage = Number( searchParams.get("page")) || 1;
    const handleSave = () => {
        if (inputValue !== '') {
            dispatch(addNewCardPackTC({name: inputValue, private: isPrivate},currentPage));
            dispatch(setIsPrivateCardPackAC(false));
            setInputValue("")
            handleClose();
        } else {
            setAddErrors('Type name of pack')
        }
    };

    const handleChangeNewPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setAddErrors('')
    };
    return (
        <Box className={s.packHeaderBlock}>
            {packsOwnerName
                ? <h1 className={s.title}>{`${spitName()} Pack list`}</h1>
                : <h1 className={s.title}>Packs list</h1>
            }
            <Box className={s.elements}>
                <Input onChange={onChangeHandler}
                       value={localPackName}
                       placeholder={"Search..."}
                       startAdornment={
                           <InputAdornment position="start">
                               <SearchIcon/>
                           </InputAdornment>
                       }
                />
                <Button
                    onClick={handleOpen}
                    className={s.addBtn}
                    title={'Add a new card pack'}
                />

                <UniversalModal modalStyle={modalStyle} show={open} h1Title={"Add a new card pack"}>
                    <FormControl error={!!addErrors} variant="standard">
                        <InputLabel htmlFor="component-simple">Enter a name of card Pack</InputLabel>
                        <Input className={modalStyles.inputsForm} id="component-simple" value={inputValue}
                               onChange={handleChangeNewPack} autoFocus={true}/>
                        {addErrors && (
                            <FormHelperText id="component-error-text">{addErrors}</FormHelperText>
                        )}
                            <FormControlLabel control={<Checkbox onChange={onchangePrivate} checked={isPrivate} size={"small"}/>} label="Private" />
                    </FormControl>
                    <Box className={modalStyles.modalBtnGroup}>
                        <Button onClick={handleClose} className={modalStyles.btnCancel} title={'Cancel'} />
                        <Button onClick={handleSave} className={modalStyles.btnSave} title={'Save new'} />
                    </Box>
                </UniversalModal>
            </Box>

        </Box>
    );
};

export default PacksHeader;