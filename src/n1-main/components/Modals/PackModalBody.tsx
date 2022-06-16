import React, {ChangeEvent, useState, forwardRef, CSSProperties} from 'react';
import {Box, FormControlLabel, Radio, RadioGroup, Paper} from "@mui/material";
import Button from "../../../Common/Components/Button";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {getCardsSelector, getLocalCardGradeSelector} from "../../../Common/Selectors/Selectors";
import modalStyles from "./ModalStyles.module.scss";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {saveLocalCardGradeAC, updateCardGradeTC} from "../../../state/cardsReducer";
import {PackCardType} from "../../../api/cardAPI";

const getRandomCard = (items: PackCardType[]) => {
    const MAX_RATING = 6;
    const arr: number[] = []; // xTimes of i for any item
    items.map((item, i) => {
        const grade = Math.round(item.grade);
        let xTimes = MAX_RATING - grade;

        while (xTimes > 0) {
            arr.push(i)
            xTimes--;
        }
    });

    const randomIndexOfArr = Math.floor(Math.random() * arr.length);
    const indexOfItem = arr[randomIndexOfArr];
    return items[indexOfItem];
}

export interface PackModalBodyPropsType {
    cardPack: PacksResponseType | undefined;
    onCancel: () => void
    modalStyle: CSSProperties
}

const QUESTION = "QUESTION";
const ANSWER = "ANSWER";

const PackModalBody = forwardRef(({cardPack, onCancel, modalStyle}: PackModalBodyPropsType, ref: any) => {
    const cards = useAppSelector(getCardsSelector);
    const [currentCard, setCurrentCard] = useState<PackCardType>(getRandomCard(cards));
    const selectedValue = useAppSelector(getLocalCardGradeSelector);
    const grades = ["I didn't know", 'Forgot', 'Long thought', 'Confused', 'I knew the answer'];
    const [step, setStep] = useState<typeof QUESTION | typeof ANSWER>(QUESTION);
    const dispatch = useAppDispatch();

    const handleChangeRatio = (e: ChangeEvent<HTMLInputElement>, value:string) => {
        dispatch(saveLocalCardGradeAC(Number(value)))
    }

    const handleCancel = () => onCancel()
    const handleSubmit = () => {
        if (step === QUESTION) {
            return setStep(ANSWER);
        }

        setStep(QUESTION);
        dispatch(updateCardGradeTC(currentCard._id))
        setCurrentCard(getRandomCard(cards));
    }


    return (
        <Paper tabIndex={-1} ref={ref}>
            <Box sx={modalStyle} className={modalStyles.modalBlock} >
                <h1 className={modalStyles.modalTitle}>Learn {cardPack?.name}</h1>
                <p className={modalStyles.modalText}><b>Question:</b>{currentCard?.question}</p>
                {step === ANSWER &&
                    (
                        <>
                            <p className={modalStyles.modalText}><b>Answer:</b>{currentCard?.answer}</p>
                            <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                            <RadioGroup
                                onChange={handleChangeRatio}
                            >
                                {
                                    grades.map((grade, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={index + 1}
                                            control={<Radio/>}
                                            label={grade}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </>
                    )
                }
                <Box className={modalStyles.modalBtnGroup}>
                    <Button onClick={handleCancel} className={modalStyles.btnCancel} title={'Cancel'}/>
                    <Button
                        className={modalStyles.btnSave}
                        disabled={step === ANSWER && !selectedValue}
                        onClick={handleSubmit}
                        title={step === ANSWER ? "Next" : "Show Answer"}
                    />
                </Box>
            </Box>
        </Paper>
    );
})

export default PackModalBody;