import React, {CSSProperties} from 'react';
import {UniversalModal} from "./UniversalModal";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useParams, useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import Button from "../../../Common/Components/Button";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";
import {PackCardType} from "../../../api/cardAPI";
import {deleteCardTC, getCardsTC} from "../../../state/cardsReducer";
import {PacksResponseType} from "../../../api/cardPacksAPI";


type ModalContainerPropsType = {
    card?: PackCardType | undefined
    pack?: PacksResponseType | undefined
    deleteCallback: (item: undefined) => void
    styles: CSSProperties
}
export const DeleteCardModalContainer = React.memo(({card, deleteCallback, styles}:ModalContainerPropsType) => {

    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "1";
    const dispatch = useAppDispatch();
    const handleCloseDelete = () => deleteCallback(undefined)
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const {packId} = useParams();

    const handleDeleteCard = () => {
        if (card) {
            dispatch(deleteCardTC(card?._id, () => {
                dispatch(getCardsTC({
                    cardsPack_id: packId,
                    page: currentPage
                }))
            }))
            handleCloseDelete()
        }
    }

    return (

        <UniversalModal handleClose={handleCloseDelete}
                        modalStyle={styles}
                        show={!!card}
                        h1Title={"Delete Card"}
                        >
            <Box>
                 <span className={modalStyles.modalText}>Do you really want to remove <b> this card </b>?
                        All cards will be excluded from this course
                 </span>
            </Box>
            <Box className={modalStyles.modalBtnGroup}>
                <Button onClick={handleCloseDelete} className={modalStyles.btnCancel} title={'Cancel'}
                        disabled={appStatus === "loading"}/>
                <Button onClick={handleDeleteCard} className={modalStyles.btnDelete} title={'Delete'}
                        disabled={appStatus === "loading"}/>

            </Box>
        </UniversalModal>
    );
});

