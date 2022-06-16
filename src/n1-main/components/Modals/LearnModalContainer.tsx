import React, {CSSProperties, useEffect} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {getCardsTC} from "../../../state/cardsReducer";
import {GetCardsParams} from "../../../api/cardAPI";
import PackModalBody from "./PackModalBody";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector, getCardsSelector} from "../../../Common/Selectors/Selectors";
import {Box} from "@mui/material";
import Button from "../../../Common/Components/Button";
import modalStyles from "../Modals/ModalStyles.module.scss";

type ModalContainerPropsType = {
    openLearnModal: PacksResponseType | undefined
    setOpenLearnModal: (openAnswer: PacksResponseType | undefined) => void
    styles: CSSProperties
}

export const LearnModalContainer = React.memo(({openLearnModal, setOpenLearnModal, styles}: ModalContainerPropsType) => {
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "1";
    const dispatch = useAppDispatch();
    const handleCloseLearnModal = () => {
        setOpenLearnModal(undefined)
    };
    const cards = useAppSelector(getCardsSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const payload: GetCardsParams = {
        cardsPack_id: openLearnModal?._id,
        page: currentPage
    }
    useEffect(() => {
        openLearnModal && dispatch(getCardsTC(payload))
    }, [dispatch, openLearnModal])

    return (
        <>
            {
                appStatus !== "loading" &&
                <UniversalModal modalStyle={styles} show={!!openLearnModal}>
                    {   cards.length >0
                        ? <PackModalBody modalStyle={styles} openAnswer={openLearnModal} onCancel={handleCloseLearnModal}/>
                        :  <>
                            <p className={modalStyles.modalText}>This card pack is empty. Please, chose another card pack</p>
                            <Box className={modalStyles.modalOneCancelBtn}>
                                <Button onClick={handleCloseLearnModal} className={modalStyles.btnCancel}
                                        title={'Cancel'}/>
                            </Box>
                        </>
                    }
                </UniversalModal>
            }
        </>
    );
});

