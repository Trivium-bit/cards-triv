import React, {useState} from 'react';
import {modalStyle} from "../pages/Packs/AllPacks/PackTable";
import modalStyles from "./ModalStyles.module.scss";
import {Box, Button, Modal} from "@mui/material";
import TextField from "@mui/material/TextField";
import {PackCardType} from "../../../api/cardAPI";
import {addNewCardTC, editCardTC, getCardsTC} from "../../../state/cardsReducer";
import {useAppDispatch} from "../../../state/store";


type EditAddModalType = {
    showAddModal?: boolean
    card?: PackCardType
    closeAddModalCallback: (item: boolean) => void
    closeEditModalCallback: (item: undefined) => void
    packId: string | undefined
    currentPage: string
}
type CardPayloadType = {
    answer: string;
    question: string;
}

type ErrorStateType = {
    answer?: string;
    question?: string;
}
export const EditAddCardModal = ({card, closeAddModalCallback, closeEditModalCallback, showAddModal, packId, currentPage}: EditAddModalType) => {

    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<ErrorStateType>({});
    const [CardPayload, setCardPayload] = useState<CardPayloadType>({
        answer: "",
        question: ""
    });

    const handleEditClose = () => {
        setErrors({});
        closeEditModalCallback(undefined)
    };
    const updateCard = () => {
        if (card && CardPayload.answer !== "" && CardPayload.question) {
            handleEditClose();
            dispatch(editCardTC(card._id,
                CardPayload.question,
                CardPayload.answer,
                () => {
                    dispatch(getCardsTC({
                        cardsPack_id: packId,
                        page: currentPage
                    }))
                }))
        } else {
            const errors: ErrorStateType = {};
            if (CardPayload.answer === "") {
                errors.answer = "Please type your answer"
            }

            if (CardPayload.question === "") {
                errors.question = "Please type your question"
            }

            setErrors(errors);
        }

    }
    const handleClose = () => {
        closeAddModalCallback(false);
        setErrors({});
        setCardPayload({
            answer: "",
            question: ""
        })
    };

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardPayload(payload => ({...payload, question: e.target.value}))
        setErrors(errors => ({...errors, question: undefined}))
    }
    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardPayload(payload => ({...payload, answer: e.target.value}))
        setErrors(errors => ({...errors, answer: undefined}))
    }
    const handleAddCard = () => {

        if (CardPayload.question !== "" && CardPayload.answer !== "") {
            closeAddModalCallback(false);
            dispatch(addNewCardTC(packId || '', {
                question: CardPayload.question,
                answer: CardPayload.answer
            }, () => {
                dispatch(getCardsTC({
                    cardsPack_id: packId,
                    page: currentPage
                }))
            }))
        } else {
            const errors: ErrorStateType = {};
            if (CardPayload.answer === "") {
                errors.answer = "Please type your new answer"
            }

            if (CardPayload.question === "") {
                errors.question = "Please type your new question"
            }

            setErrors(errors);
        }
    }
    return (
        <Modal
            open={!!card || !!showAddModal}
            onClose={card ? handleEditClose : handleClose}
        >
            <Box sx={modalStyle} className={modalStyles.modalBlock}>
                <h1 className={modalStyles.modalTitle}>{card ? "Edit Card" : "Add a new card"}</h1>
                <Box>
                    <TextField multiline className={modalStyles.inputsForm}
                               placeholder={"Type your question"}
                               label="Question"
                               onChange={handleChangeQuestion}
                               error={!!errors.question}
                               helperText={errors.question}
                               defaultValue={card?.question}/>
                </Box>
                <Box>
                    <TextField multiline className={modalStyles.inputsForm}
                               placeholder={"Type your answer"}
                               onChange={handleChangeAnswer}
                               error={!!errors.answer}
                               helperText={errors.answer}
                               defaultValue={card?.answer}
                               label="Answer"/>
                    <Box className={modalStyles.modalBtnGroup}>
                        {card
                            ? <>
                                <Button sx={{textTransform: "none"}} onClick={handleEditClose}
                                        className={modalStyles.btnCancel}>Cancel</Button>
                                <Button sx={{textTransform: "none"}} className={modalStyles.btnSave}
                                        onClick={updateCard}>Save</Button>
                            </>
                            : <>
                                <Button sx={{textTransform: "none"}} onClick={handleClose}
                                        className={modalStyles.btnCancel}>Cancel</Button>
                                <Button sx={{textTransform: "none"}} className={modalStyles.btnSave}
                                        onClick={handleAddCard}>Add</Button>
                            </>
                        }
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

