import React, {CSSProperties} from 'react';
import {UniversalModal} from "./UniversalModal";
import {useAppDispatch} from "../../../state/store";
import {useParams, useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import {PackCardType} from "../../../api/cardAPI";
import {deleteCardTC, getCardsTC} from "../../../state/cardsReducer";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import Button from "@mui/material/Button";
import modalStyles from "./ModalStyles.module.scss";

type ModalContainerPropsType = {
    card: PackCardType | null
    pack?: PacksResponseType | undefined
    deleteCallback: (item: undefined) => void
    styles: CSSProperties
}
export const DeleteCardModalContainer = React.memo(({card, deleteCallback, styles}:ModalContainerPropsType) => {

    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "1";
    const dispatch = useAppDispatch();
    const handleCloseDelete = () => deleteCallback(undefined)
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
                <Button sx={{textTransform: "none"}} onClick={handleCloseDelete} className={modalStyles.btnCancel}>Cancel</Button>
                <Button sx={{textTransform: "none"}} onClick={handleDeleteCard} className={modalStyles.btnDelete}>Delete</Button>
            </Box>
        </UniversalModal>
    );
});

