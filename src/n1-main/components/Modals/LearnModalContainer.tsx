import React, {CSSProperties, useEffect, useState} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useSearchParams} from "react-router-dom";
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import modalStyles from "./ModalStyles.module.scss";
import Button from "../../../Common/Components/Button";
import {getCardsTC} from "../../../state/cardsReducer";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";


type ModalContainerPropsType = {
    openLearnModal: PacksResponseType | undefined
    setOpenLearnModal: (openAnswer: PacksResponseType | undefined) => void
    styles: CSSProperties
}

export const LearnModalContainer = React.memo(({openLearnModal, setOpenLearnModal, styles}: ModalContainerPropsType) => {

    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const grades = ["I don't know", 'Forgot', 'Long thought', 'Confused', 'I knew the answer'];
    const [openAnswerModal, setOpenAnswerModal] = useState<boolean>(false);
    const cardsData = useAppSelector(state => state.cardsReducer.cards); // пока просто заглушка, потом вопрос будет браться случайно по аглоритму
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "1";
    const dispatch = useAppDispatch();
    const handleOpenLearnModal = () => setOpenAnswerModal(true);
    const handleCloseLearnModal = () => {
        setOpenLearnModal(undefined)
    };
    const handleCloseAnswerModal = () => {
        setOpenAnswerModal(false);
        setOpenLearnModal(undefined)
    }
    const rateCard = () => {
        //тут будет санка на добавление рейтинга
    }
    useEffect(() => {
        openLearnModal && dispatch(getCardsTC(openLearnModal?._id, currentPage))
    }, [dispatch, openLearnModal, currentPage])

    return (
        <>
            {
                appStatus !== "loading" &&
                <UniversalModal modalStyle={styles}
                                show={!!openLearnModal}
                                h1Title={openLearnModal?.name}
                                modalOnClick={handleCloseLearnModal}>

                    {
                        cardsData.length > 0
                            ?
                            <>
                                <p className={modalStyles.modalText}>
                                    <b>Question:</b> {cardsData[0] && cardsData[0].question}
                                </p>
                                <Box className={modalStyles.modalBtnGroup}>
                                    <Button onClick={handleCloseLearnModal} className={modalStyles.btnCancel}
                                            title={'Cancel'}/>
                                    <Button onClick={handleOpenLearnModal} className={modalStyles.btnSave}
                                            title={'Show Answer'}/>
                                </Box>
                            </>
                            :
                            <>
                                <p className={modalStyles.modalText}>This card pack is empty. Please, chose another card pack.</p>
                                <Box className={modalStyles.modalOneCancelBtn}>
                                    <Button onClick={handleCloseLearnModal} className={modalStyles.btnCancel}
                                            title={'Cancel'}/>
                                </Box>
                            </>
                    }
                </UniversalModal>

            }

            <UniversalModal modalStyle={styles}
                            show={openAnswerModal}
                            h1Title={`Learn “${openLearnModal?.name}“`}>

                <p className={modalStyles.modalText}><b>Question:</b> “{cardsData[0] && cardsData[0].question}”</p>
                <p className={modalStyles.modalText}><b>Answer:</b> “{cardsData[0] && cardsData[0].answer}”</p>
                <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                <RadioGroup>
                    {
                        grades.map((grade, index) => <FormControlLabel onClick={rateCard} key={index} value={grade}
                                                                       control={<Radio/>} label={grade}/>)
                    }
                </RadioGroup>
                <Box className={modalStyles.modalBtnGroup}>
                    <Button onClick={handleCloseAnswerModal}
                            className={modalStyles.btnCancel}
                            title={'Cancel'}/>
                    <Button className={modalStyles.btnSave} title={'Next'}/>
                </Box>
            </UniversalModal>
        </>
    );
});

