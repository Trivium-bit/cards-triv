import React, {useMemo, useState} from 'react';
import {Box, FormControl, Input, InputAdornment, InputLabel, Modal} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../../../../Common/Components/Button";
import modalStyles from "./styles/ModalStyles.module.scss";
import s from './styles/PackHeader.module.scss'
import {addNewCardPackTC} from "../../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {useLocation} from "react-router-dom";

type PacksHeaderPropsType = {
    onSearch?: (searchQuery: string) => void
    onAddNew?: () => void
    packsOwnerName?: string
}

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

const PacksHeader: React.FC<PacksHeaderPropsType> = ({packsOwnerName, onAddNew}) => {
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const myId = useAppSelector<string>(state => state.appReducer.user._id);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const spitName = () => {
        const spitedName = packsOwnerName?.split(" ");
        if (spitedName) {
            return `${spitedName[0]}'s`
        }
    }

    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);
    const handleSave = () => {
        dispatch(addNewCardPackTC({
                name: inputValue
            }, () => {
                handleClose();
                if (onAddNew) {
                    onAddNew()
                }
            },currentPage, myId
            )
        );
    };

    const handleChangeNewPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <Box className={s.packHeaderBlock}>
            {packsOwnerName
                ? <h1 className={s.title}>{`${spitName()} Pack list`}</h1>
                : <h1 className={s.title}>Packs list</h1>
            }
            <Box className={s.elements}>
                <Input
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
                    title={'Add New Pack'}
                    />
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={modalStyle} className={modalStyles.modalBlock}>
                        <h1 className={modalStyles.modalTitle}>Add new pack</h1>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Name Pack</InputLabel>
                            <Input className={modalStyles.inputsForm} id="component-simple" value={inputValue}
                                   onChange={handleChangeNewPack}/>
                        </FormControl>
                        <Box className={modalStyles.modalBtnGroup}>
                            <Button onClick={handleClose} className={modalStyles.btnCancel} title={'Cancel'} disabled={appStatus ==="loading"}/>
                            <Button onClick={handleSave} className={modalStyles.btnSave} title={'Save new'} disabled={appStatus ==="loading"}/>
                        </Box>
                    </Box>
                </Modal>
            </Box>

        </Box>
    );
};

export default PacksHeader;