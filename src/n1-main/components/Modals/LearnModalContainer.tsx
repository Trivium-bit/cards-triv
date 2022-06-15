import React, {CSSProperties, useEffect} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {useAppDispatch} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {getCardsTC} from "../../../state/cardsReducer";
import {GetCardsParams} from "../../../api/cardAPI";
import PackModalBody from "../pages/Packs/AllPacks/PackModalBody";

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
    const payload: GetCardsParams = {
        cardsPack_id: openLearnModal?._id,
        page: currentPage
    }
    useEffect(() => {
        openLearnModal && dispatch(getCardsTC(payload))
    }, [dispatch, openLearnModal])

    return (
        <>
            <UniversalModal modalStyle={styles} show={!!openLearnModal}  h1Title={openLearnModal?.name}>
                <PackModalBody openAnswer={openLearnModal} onCancel={handleCloseLearnModal}/>
            </UniversalModal>
        </>
    );
});

