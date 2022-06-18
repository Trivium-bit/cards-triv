import React, {ChangeEvent, CSSProperties, useState} from 'react';
import {UniversalModal} from "./UniversalModal";

import {
    addNewCardPackTC,
    CardPackUpdateRequestType,
    editCardPackAC,
    editMyCardsPacksTC, setIsPrivateCardPackAC
} from "../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {Box, Checkbox} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import Button from "../../../Common/Components/Button";
import TextField from "@mui/material/TextField";
import {maxCardPackNameLength} from "../pages/Packs/PacksHeader";
import FormControlLabel from "@mui/material/FormControlLabel";


type ModalContainerPropsType = {
    showAddNewPackModal?: boolean
    pack?: CardPackUpdateRequestType
    closeModalCallback: (item: undefined) => void
    styles: CSSProperties
}
export const EditAddModalContainer = React.memo(({pack, closeModalCallback, styles, showAddNewPackModal}: ModalContainerPropsType) => {

    const [newPackName, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false);
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    const updatedCardPackName = useAppSelector<string>(state => state.cardPacksReducer.newCardPackName);
    const isPrivate = useAppSelector<boolean>(state => state.cardPacksReducer.isPrivate);

    const handleCloseModal = () => {
        setInputError(false);
        closeModalCallback(undefined);
        setInputValue("");
        dispatch(setIsPrivateCardPackAC(false));
        dispatch(editCardPackAC(""));
    };
    const handleEditPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editCardPackAC((event.target.value)));
        setInputError(false);
    };
    const updatePackName = () => {
        if (pack && updatedCardPackName !== "" && updatedCardPackName.length <= maxCardPackNameLength) {
            dispatch(editMyCardsPacksTC({_id: pack._id, name: updatedCardPackName, private: isPrivate}, currentPage));
            handleCloseModal();
        } else {
            setInputError(true);
        }

    };
    const onchangePrivate = () => {
        dispatch(setIsPrivateCardPackAC(!isPrivate))
    }
    const handleChangeNewPack = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
        setInputError(false)
    };
    const saveNewPack = () => {
        if (newPackName !== '' && newPackName.length <= maxCardPackNameLength) {
            dispatch(addNewCardPackTC({name: newPackName, private: isPrivate}, currentPage));
            dispatch(setIsPrivateCardPackAC(false));
            setInputValue("")
            handleCloseModal();
        } else {
            setInputError(true)
        }
    };

    return (

        <UniversalModal modalStyle={styles}
                        show={!!pack || !!showAddNewPackModal}
                        h1Title={pack ? "Enter a new card pack name" : "Add a new card pack"}
                        handleClose={handleCloseModal}>

            <TextField className={modalStyles.inputsForm} autoFocus={true}
                       defaultValue={pack?.name}
                       value={showAddNewPackModal && newPackName}
                       placeholder={pack ? "Enter a new name of card Pack" : "Enter a name of card Pack"}
                       onChange={pack ? handleEditPack : handleChangeNewPack}
                       error={updatedCardPackName.length > maxCardPackNameLength || inputError || newPackName.length > maxCardPackNameLength}
                       helperText={
                           ((updatedCardPackName.length > maxCardPackNameLength
                               || newPackName.length > maxCardPackNameLength) && `Card pack name must be ${maxCardPackNameLength} symbols max`)
                           || (inputError && 'Type name of pack')
                       }
            />
            <FormControlLabel control={<Checkbox onChange={onchangePrivate} checked={isPrivate} size={"small"}/>}
                              label="Private"/>
            <Box className={modalStyles.modalBtnGroup}>
                <Button onClick={handleCloseModal} className={modalStyles.btnCancel} title={'Cancel'}/>
                <Button onClick={pack ? updatePackName : saveNewPack} className={modalStyles.btnSave}
                        title={pack ? 'Update name' : 'Save new'}/>
            </Box>

        </UniversalModal>
    );
});

