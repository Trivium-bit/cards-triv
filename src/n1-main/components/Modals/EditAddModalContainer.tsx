import React, {ChangeEvent, CSSProperties, useEffect, useState} from 'react';
import {UniversalModal} from "./UniversalModal";

import {
    addNewCardPackTC,
    CardPackUpdateRequestType,
    editMyCardsPacksTC,
} from "../../../state/cardPacksReducer";
import {useAppDispatch} from "../../../state/store";
import {Box, Checkbox} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import TextField from "@mui/material/TextField";
import {maxCardPackNameLength} from "../pages/Packs/PacksHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";


type ModalContainerPropsType = {
    showAddNewPackModal?: boolean
    pack?: CardPackUpdateRequestType
    closeModalCallback: (item: undefined) => void
    styles: CSSProperties
}
export const EditAddModalContainer = ({pack, closeModalCallback, styles, showAddNewPackModal}: ModalContainerPropsType) => {
    console.log(pack)

    const [newPackName, setNewPackName] = useState('');
    const [inputError, setInputError] = useState(false);
    const dispatch = useAppDispatch();
    const [updatedPackName, setUpdatedPackName] = useState<string>(pack ? pack.name : '')
    const [isPrivate, setIsPrivate] = useState<boolean>(pack ? pack.private : false)

     useEffect(()=>{
         setUpdatedPackName(pack ? pack.name : '') //useEffect необходим так как когда отрисовывается packTable отрисовывается и rowToUpdate а там инит знач undefined
         setIsPrivate(pack ? pack.private : false) //это значение приходит в useState в модалке и засовывает туда undefined, поэтому всегда при первой отрисовке будет undefined
     },[pack])// тогда useEffect сазтавляет компоненту принудительно перерисоваться и сохраняет значения с сервера

    const handleCloseModal = () => {
        setInputError(false);
        closeModalCallback(undefined);
        setNewPackName("");
        setIsPrivate(false)
        setUpdatedPackName("")
        setIsPrivate(false)
    };
    const handleEditPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedPackName(event.target.value)
        setInputError(false);
    };
    const updatePackName = () => {
        if (pack && updatedPackName && updatedPackName !== "" && updatedPackName.length <= maxCardPackNameLength) {
            dispatch(editMyCardsPacksTC({_id: pack._id, name: updatedPackName, private: isPrivate}));
            handleCloseModal();

        } else {
            setInputError(true);
        }

    };
    const onchangePrivate = () => {
        setIsPrivate(!isPrivate)
    }
    const handleChangeNewPack = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewPackName(event.target.value);
        setInputError(false);
    };
    const saveNewPack = () => {
        if (newPackName !== '' && newPackName.length <= maxCardPackNameLength) {
            dispatch(addNewCardPackTC({name: newPackName, private: isPrivate}));
           setIsPrivate(false)
            setNewPackName("")
            handleCloseModal();
            setIsPrivate(false)
        } else {
            setInputError(true);
        }
    };

    console.log("pack?.private", pack?.private)
    console.log("isPrivate", isPrivate)
    console.log("updatedPackName", updatedPackName)
    console.log("pack?.name", pack?.name)
    return (

        <UniversalModal modalStyle={styles}
                        show={!!pack || !!showAddNewPackModal}
                        h1Title={pack ? "Enter a new card pack name" : "Add a new card pack"}
                        handleClose={handleCloseModal}>

            <TextField className={modalStyles.inputsForm}

                       value={showAddNewPackModal ? newPackName: updatedPackName}
                       placeholder={pack ? "Enter a new name of card Pack" : "Enter a name of card Pack"}
                       onChange={pack ? handleEditPack : handleChangeNewPack}
                       error={(updatedPackName && updatedPackName.length > maxCardPackNameLength) || inputError || newPackName.length > maxCardPackNameLength}
                       helperText={
                           (((updatedPackName && updatedPackName.length > maxCardPackNameLength)
                               || newPackName.length > maxCardPackNameLength) && `Card pack name must be ${maxCardPackNameLength} symbols max`)
                           || (inputError && 'Type name of pack')
                       }
            />
            <FormControlLabel control={<Checkbox onChange={onchangePrivate} checked={isPrivate} size={"small"}/>}
                              label="Private"/>
            <Box className={modalStyles.modalBtnGroup}>
                <Button sx={{textTransform: "none"}} onClick={handleCloseModal}
                        className={modalStyles.btnCancel}>Cancel</Button>

                <Button sx={{textTransform: "none"}} onClick={pack ? updatePackName : saveNewPack}
                        className={modalStyles.btnSave}>{pack ? 'Update card pack' : 'Save new'}</Button>
            </Box>

        </UniversalModal>
    );
};

