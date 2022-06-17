import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    Checkbox,
    Input,
    InputAdornment,
} from "@mui/material";
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
import TextField from "@mui/material/TextField";


type PacksHeaderPropsType = {
    packsOwnerName?: string
}

export const maxCardPackNameLength = 26;
const PacksHeader: React.FC<PacksHeaderPropsType> = ({packsOwnerName}) => {
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false)
    const isPrivate = useAppSelector<boolean>(state => state.cardPacksReducer.isPrivate);
    const localPackName = useAppSelector<string>(state => state.cardPacksReducer.packName);
    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setInputValue("");
        setInputError(false)
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
    const onchangePrivate = () =>{
        dispatch(setIsPrivateCardPackAC(!isPrivate))
    }
    const currentPage = Number( searchParams.get("page")) || 1;
    const handleSave = () => {
        if (inputValue !== '' && inputValue.length <= 26) {
            dispatch(addNewCardPackTC({name: inputValue, private: isPrivate},currentPage));
            dispatch(setIsPrivateCardPackAC(false));
            setInputValue("")
            handleClose();
        } else {
            setInputError(true)
        }
    };

    const handleChangeNewPack = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
        setInputError(false)
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

                <UniversalModal modalStyle={modalStyle} show={open} h1Title={"Add a new card pack"} handleClose={handleClose}>

                        <TextField className={modalStyles.inputsForm}
                                   value={inputValue}
                                   onChange={handleChangeNewPack} autoFocus={true}
                                   placeholder={"Enter a name of card Pack"}
                                   error={inputValue.length > maxCardPackNameLength || inputError}
                                   helperText={
                                       (inputValue.length > maxCardPackNameLength && `Card pack name must be ${maxCardPackNameLength} symbols max`) ||
                                       (inputError && 'Type name of pack')
                                   }/>
                            <FormControlLabel control={<Checkbox onChange={onchangePrivate} checked={isPrivate} size={"small"}/>} label="Private" />
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