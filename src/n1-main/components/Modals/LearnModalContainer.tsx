import React, {CSSProperties, useEffect} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {getCardsTC} from "../../../state/cardsReducer";
import PackModalBody from "./PackModalBody";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";
import {Box} from "@mui/material";
import Button from "../../../Common/Components/Button";
import modalStyles from "../Modals/ModalStyles.module.scss";

type ModalContainerPropsType = {
    cardPack: PacksResponseType | undefined //это выбранная в PackTable колода карт
    deleteCallback: any
    styles: CSSProperties
}

export const LearnModalContainer = React.memo(({cardPack, deleteCallback, styles}: ModalContainerPropsType) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const handleCloseLearnModal = () => {
        deleteCallback(undefined)
    };
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);

    useEffect(() => {
        if(cardPack){
            searchParams.set("cardsPack_id", cardPack?._id)
            setSearchParams(searchParams) // сетаем выбранную айдишку колоды в url
            dispatch(getCardsTC({cardsPack_id: cardPack?._id, pageCount: 100000})) // получаем все карточки в выбранной колоде
        }
    }, [dispatch, cardPack])

    return (
        <>
            {
                appStatus !== "loading" &&
                <UniversalModal modalStyle={styles} show={!!cardPack} handleClose={handleCloseLearnModal}>
                    {   cardPack?.cardsCount && cardPack?.cardsCount >0
                        ? <PackModalBody modalStyle={styles} cardPack={cardPack} onCancel={handleCloseLearnModal}/>
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

