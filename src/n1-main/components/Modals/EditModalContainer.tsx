import React, {CSSProperties} from 'react';
import {UniversalModal} from "./UniversalModal";

import {
    CardPackUpdateRequestType,
    editCardPackAC,
    editMyCardsPacksTC
} from "../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {Box, FormControl, Input, InputLabel} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import Button from "../../../Common/Components/Button";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";


type ModalContainerPropsType = {
    rowToUpdate: CardPackUpdateRequestType | undefined
    setRowToUpdate: (rowToDelete:CardPackUpdateRequestType | undefined) => void
    styles: CSSProperties
}
export const EditModalContainer = React.memo(({rowToUpdate, setRowToUpdate, styles}:ModalContainerPropsType) => {

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const updatedCardPackName = useAppSelector<string>(state => state.cardPacksReducer.newCardPackName);
    const handleCloseEdit = () => setRowToUpdate(undefined);
    const handleChangeNewPack = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editCardPackAC((event.target.value)));
    };
    const updatePackName = () => {
        if (rowToUpdate) {
            dispatch(editMyCardsPacksTC({_id: rowToUpdate._id, name: updatedCardPackName}, currentPage))
            handleCloseEdit();
        }

    };
    return (

        <UniversalModal modalStyle={styles}
                        show={!!rowToUpdate}
                        h1Title={"Enter new card pack name"}
                        >
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Enter new card pack name</InputLabel>
                    <Input className={modalStyles.inputsForm} id="component-simple" autoFocus={true}
                           defaultValue={rowToUpdate?.name}
                           onChange={handleChangeNewPack} disabled={appStatus === "loading"}/>
                </FormControl>
                <Box className={modalStyles.modalBtnGroup}>
                    <Button onClick={handleCloseEdit} className={modalStyles.btnCancel} title={'Cancel'}
                            disabled={appStatus === "loading"}/>
                    <Button onClick={updatePackName} className={modalStyles.btnSave} title={'Save new name'}
                            disabled={appStatus === "loading"}/>
                </Box>

        </UniversalModal>
    );
});

