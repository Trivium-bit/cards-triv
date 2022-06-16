import React, {ChangeEvent, useState, forwardRef, CSSProperties} from 'react';
import {Box, FormControlLabel, Radio, RadioGroup, Paper} from "@mui/material";
import Button from "../../../Common/Components/Button";
import {useAppSelector} from "../../../state/store";
import {getCardsSelector} from "../../../Common/Selectors/Selectors";
import modalStyles from "./ModalStyles.module.scss";
import {PacksResponseType} from "../../../api/cardPacksAPI";


export interface PackModalBodyPropsType {
    openAnswer: PacksResponseType | undefined;
    onCancel: () => void
    modalStyle: CSSProperties
}

const QUESTION = "QUESTION";
const ANSWER = "ANSWER";

const PackModalBody = forwardRef(({openAnswer, onCancel, modalStyle}: PackModalBodyPropsType, ref: any) => {
    const cards = useAppSelector(getCardsSelector);
    const currentCard = cards[0];
    const grades = ["I didn't know", 'Forgot', 'Long thought', 'Confused', 'I knew the answer'];
    const [step, setStep] = useState<typeof QUESTION | typeof ANSWER>(QUESTION)
    const [selectedRatio, setSelectedRatio] = useState<string | boolean>(false) // Думаю, лучше сохранять в редакс рейтинг, а не локально

    const handleChangeRatio = (e: ChangeEvent<HTMLInputElement>, value:string) => {
        setSelectedRatio(value)
        console.log(value)
        //тут надо сохранять value через action creator в редьюсер
    }
    console.log(cards[0])
    const handleCancel = () => onCancel()
    const handleSubmit = () => {
        if (step === QUESTION) {
            return setStep(ANSWER);
        }

        setStep(QUESTION);
        setSelectedRatio(false)
        //тут надо диспачить санку на рейтинг, куда отправлять value из редьюсера. Значение рейтига надо получить через useAppSelector из стейта
    }


    return (
        <Paper tabIndex={-1} ref={ref}>
            <Box sx={modalStyle} className={modalStyles.modalBlock} >
                <h1 className={modalStyles.modalTitle}>Learn {openAnswer?.name}</h1>
                <p className={modalStyles.modalText}><b>Question:</b>{currentCard?.question}</p>
                {step === ANSWER &&
                    (
                        <>
                            <p className={modalStyles.modalText}><b>Answer:</b>{currentCard?.answer}</p>
                            <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                            <RadioGroup onChange={handleChangeRatio}>
                                {
                                    grades.map((grade, index) => <FormControlLabel
                                                                                   key={index}
                                                                                   value={index + 1}
                                                                                   control={<Radio/>}
                                                                                   label={grade}/>)
                                }
                            </RadioGroup>
                        </>
                    )
                }
                <Box className={modalStyles.modalBtnGroup}>
                    <Button onClick={handleCancel} className={modalStyles.btnCancel} title={'Cancel'}/>
                    <Button
                        className={modalStyles.btnSave}
                        disabled={step === ANSWER && !selectedRatio}
                        onClick={handleSubmit}
                        title={step === ANSWER ? "Next" : "Show Answer"}
                    />
                </Box>
            </Box>
        </Paper>
    );
})

export default PackModalBody;