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
    pack: PacksResponseType | undefined
    closeModalCallback: (item:undefined) => void
    styles: CSSProperties
}
export const DeleteModalContainer = React.memo(({pack, closeModalCallback, styles}:ModalContainerPropsType) => {

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const dispatch = useAppDispatch();
    const handleCloseDelete = () => closeModalCallback(undefined);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);

    const handleDeletePack = () => {
        if (pack) {
            dispatch(deleteCardPackTC(pack._id, currentPage))
            handleCloseDelete();
        }
    }

    return (

        <UniversalModal modalStyle={styles}
                        show={!!pack}
                        h1Title={"Delete Pack"}
                        handleClose={handleCloseDelete}
                        >
            <Box>
                 <span className={modalStyles.modalText}>Do you really want to remove <b> card pack - {pack?.name }</b>?
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

