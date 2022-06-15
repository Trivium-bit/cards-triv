import React, {CSSProperties} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {deleteCardPackTC} from "../../../state/cardPacksReducer";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import Button from "../../../Common/Components/Button";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";


type ModalContainerPropsType = {
    rowToDelete: PacksResponseType | undefined
    setRowToDelete: (rowToDelete:PacksResponseType| undefined) => void
    styles: CSSProperties
}
export const DeleteModalContainer = React.memo(({rowToDelete, setRowToDelete, styles}:ModalContainerPropsType) => {

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    const handleCloseDelete = () => setRowToDelete(undefined);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);

    const handleDeletePack = () => {
        if (rowToDelete) {
            dispatch(deleteCardPackTC(rowToDelete._id, currentPage))
            handleCloseDelete();
        }
    }

    return (

        <UniversalModal modalStyle={styles}
                        show={!!rowToDelete}
                        h1Title={"Delete Pack"}
                        modalOnClick={handleDeletePack}>
            <Box>
                 <span className={modalStyles.modalText}>Do you really want to remove <b> card pack - {rowToDelete?.name }</b>?
                        All cards will be excluded from this course
                 </span>
            </Box>
            <Box className={modalStyles.modalBtnGroup}>
                <Button onClick={handleCloseDelete} className={modalStyles.btnCancel} title={'Cancel'}
                        disabled={appStatus === "loading"}/>
                <Button onClick={handleDeletePack} className={modalStyles.btnDelete} title={'Delete'}
                        disabled={appStatus === "loading"}/>

            </Box>
        </UniversalModal>
    );
});

