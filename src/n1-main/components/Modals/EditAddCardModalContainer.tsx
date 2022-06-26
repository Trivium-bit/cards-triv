import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {modalStyle} from "../pages/Packs/AllPacks/PackTable";
import modalStyles from "./ModalStyles.module.scss";
import {Box, Button, Modal} from "@mui/material";
import TextField from "@mui/material/TextField";
import {PackCardPayloadType, PackCardType} from "../../../api/cardAPI";
import {addNewCardTC, editCardTC, getCardsTC} from "../../../state/cardsReducer";
import {useAppDispatch} from "../../../state/store";
import {setAppErrorAC} from "../../../state/app-reducer";
import {maxPictureSize} from "../pages/EditProfile/EditProfileModal";


type EditAddModalType = {
    showAddModal?: boolean
    card: PackCardType | null
    closeAddModalCallback: (item: boolean) => void
    closeEditModalCallback: Dispatch<SetStateAction<PackCardType | null>>
    packId: string | undefined
    currentPage: string
}

type ErrorStateType = {
    answer?: string;
    question?: string;
}
export const EditAddCardModalContainer = ({card, closeAddModalCallback, closeEditModalCallback, showAddModal, packId, currentPage}: EditAddModalType) => {

    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<ErrorStateType>({} as ErrorStateType);
    const [cardPayload, setCardPayload] = useState<PackCardPayloadType>({
        answer: card?.answer,
        question: card?.question,
        questionImg: card?.questionImg,
        answerImg: card?.answerImg
    });


    useEffect(() => {
        setCardPayload({
            answer: card?.answer,
            question: card?.question,
            questionImg: card?.questionImg,
            answerImg: card?.answerImg
        })
    }, [card])

    const handleEditModalClose = () => {
        setErrors({});
        closeEditModalCallback(null)
    };
    const updateCard = () => {

        if (card && cardPayload.answer !== "" && cardPayload.question !== "") {
            handleEditModalClose();

            dispatch(editCardTC(card._id,
                {
                    answer:cardPayload.answer,
                    question:cardPayload.question,
                    answerImg:cardPayload.answerImg,
                    questionImg:cardPayload.questionImg
                },
                () => {
                    dispatch(getCardsTC({
                        cardsPack_id: packId,
                        page: currentPage,
                    }))
                }))
            handleAddModalClose()
        } else {
            const errors: ErrorStateType = {};
            if (cardPayload.answer === "") {
                errors.answer = "Please type your new answer"
            }

            if (cardPayload.question === "") {
                errors.question = "Please type your new question"
            }

            setErrors(errors);
        }

    }

    const handleAddModalClose = () => {
        closeAddModalCallback(false);
        setErrors({});
        setCardPayload({
            answer: "",
            question: "",
            questionImg: "",
            answerImg: "",
        })

    };
    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const file = e.target?.files;

        if ((file && file[0].type) && (file[0].type === "image/png" || file[0].type === "image/jpeg" || file[0].type === "image/gif")) {
            reader.onloadend = function () {
              e.target.id === "question"
                  ? setCardPayload({...cardPayload, questionImg: reader.result})
                  : setCardPayload( {...cardPayload, answerImg: reader.result})
            }
            if (file[0].size && file[0].size <= maxPictureSize) {
                reader.readAsDataURL(file[0])
            } else {
                dispatch(setAppErrorAC("Your file size must be less then 1MB 😕"))
            }

        } else {
            dispatch(setAppErrorAC(`Your file has not in .png .jpeg .gif format. Please choose the right file`))
        }
    }

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCardPayload({...cardPayload, question: e.target.value})
        setErrors({...errors, question: undefined})
    }
    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCardPayload({...cardPayload, answer: e.target.value})
        setErrors({...errors, answer: undefined})
    }
    const handleAddCard = () => {


        if (cardPayload.question && cardPayload.answer) {
            closeAddModalCallback(false);
            dispatch(addNewCardTC(packId || '', {
                question: cardPayload.question,
                answer: cardPayload.answer,
                questionImg: cardPayload.questionImg,
                answerImg: cardPayload.answerImg

            }, () => {
                dispatch(getCardsTC({
                    cardsPack_id: packId,
                    page: currentPage,
                }))
            }))
            handleAddModalClose()
        } else {
            const errors: ErrorStateType = {};
            if (!cardPayload.answer ) {
                errors.answer = "Please type your answer"
            }

            if (!cardPayload.question) {
                errors.question = "Please type your question"
            }

            setErrors(errors);
        }
    }

    return (
        <Modal
            open={!!card || !!showAddModal}
            onClose={card ? handleEditModalClose : handleAddModalClose}
        >
            <Box sx={modalStyle} className={modalStyles.modalBlock}>
                <h1 className={modalStyles.modalTitle}>{card ? "Edit Card" : "Add a new card"}</h1>
                <Box>

                    <TextField multiline className={modalStyles.inputsForm}
                               placeholder={"Type your question"}
                               label="Question"
                               value={cardPayload.question}
                               onChange={handleChangeQuestion}
                               error={!!errors.question}
                               helperText={errors.question}
                    />
                    <div style={cardPayload.questionImg || card?.questionImg ?{display: "flex", justifyContent: "center"}: {display: "none"}}>
                        <img src={cardPayload.questionImg || card?.questionImg} alt={"question"} width={"200px"}/>
                    </div>
                </Box>
                <input type={"file"} style={{display:"none"}} id={"question"} ref={questionRef} accept="image/*" onChange={uploadImage}/>

                <Box className={modalStyles.attachFile} onClick={() => questionRef.current && questionRef.current.click()}>+ Attach file</Box>
                <Box>

                    <TextField multiline className={modalStyles.inputsForm}
                               placeholder={"Type your answer"}
                               value={cardPayload.answer}
                               onChange={handleChangeAnswer}
                               error={!!errors.answer}
                               helperText={errors.answer}
                               label="Answer"/>
                    <div style={cardPayload.answerImg || card?.answerImg ? {display: "flex", justifyContent: "center"}: {display: "none"}} >
                        <img src={cardPayload.answerImg || card?.answerImg} alt={"answer"} width={"200px"}/>
                    </div>
                    <input type={"file"} style={{display:"none"}} id={"answer"} ref={answerRef} accept="image/*" onChange={uploadImage}/>
                    <Box className={modalStyles.attachFile} onClick={() => answerRef.current && answerRef.current.click()}>+ Attach file</Box>
                    <Box className={modalStyles.modalBtnGroup}>
                        {card
                            ? <>
                                <Button sx={{textTransform: "none"}} onClick={handleEditModalClose}
                                        className={modalStyles.btnCancel}>Cancel</Button>
                                <Button sx={{textTransform: "none"}} className={modalStyles.btnSave}
                                        onClick={updateCard}>Save</Button>
                            </>
                            : <>
                                <Button sx={{textTransform: "none"}} onClick={handleAddModalClose}
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

