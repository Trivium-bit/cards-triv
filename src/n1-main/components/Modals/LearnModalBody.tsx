import React, {ChangeEvent, useState, forwardRef, CSSProperties} from 'react';
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import modalStyles from "./ModalStyles.module.scss";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {saveLocalCardGradeAC, updateCardGradeTC} from "../../../state/cardsReducer";
import {PackCardType} from "../../../api/cardAPI";
import {getCardsSelector, getLocalCardGradeSelector} from "../../../Common/Selectors/Selectors";
import Button from "@mui/material/Button";
import {StyledRating} from "../pages/Packs/CardDetails";

const getRandomCard = (items: PackCardType[]) => {
    const MAX_RATING = 6;
    const arr: number[] = []; // xTimes of i for any item
    items.forEach((item, i) => {
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
const grades = ["I didn't know", 'Forgot', 'Long thought', 'Confused', 'I knew the answer'];

const LearnModalBody = forwardRef(({cardPack, onCancel, modalStyle}: PackModalBodyPropsType, ref: any) => {
    const dispatch = useAppDispatch();
    const selectedValue = useAppSelector(getLocalCardGradeSelector);
    const cards = useAppSelector(getCardsSelector);
    const [step, setStep] = useState<typeof QUESTION | typeof ANSWER>(QUESTION);
    const [currentCard, setCurrentCard] = useState<PackCardType>(getRandomCard(cards));

    const handleChangeRatio = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        dispatch(saveLocalCardGradeAC(Number(value)))
    }

    const handleCancel = () => {
        onCancel();
        dispatch(saveLocalCardGradeAC(0));
    };
    const handleSubmit = () => {
        if (step === QUESTION) {
            return setStep(ANSWER);
        }

        setStep(QUESTION);
        dispatch(updateCardGradeTC(currentCard._id))
        setCurrentCard(getRandomCard(cards));
    }


    return (
        <Box sx={modalStyle} className={modalStyles.modalBlock} ref={ref}>
            <h1 className={modalStyles.modalTitle}>Learn {cardPack?.name}</h1>
            <p className={modalStyles.modalText}><b>Question:</b> {currentCard?.question}</p>

            {step === ANSWER &&
            (
                <>
                    <p className={modalStyles.modalText}><b>Numbers of attempts to answer:</b> {currentCard?.shots}</p>
                    <p className={modalStyles.modalRating}><b>Card rating:</b>
                     <StyledRating readOnly size="small" value={currentCard.grade}/></p>
                    <p className={modalStyles.modalText}><b>Answer:</b>{currentCard?.answer}</p>
                    <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                    <RadioGroup style={{width:" 200px"}}
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
                <Button sx={{textTransform: "none"}}
                        onClick={handleCancel} className={modalStyles.btnCancel}>Cancel</Button>

                    <Button sx={{textTransform: "none"}}
                         className={`${modalStyles.btnSave} ${step === ANSWER && selectedValue === 0 && modalStyles.disabled}`}
                         disabled={step === ANSWER && selectedValue === 0}
                         onClick={handleSubmit}
                >{step === ANSWER ? "Next" : "Show Answer"}
                </Button>


            </Box>
        </Box>
    );
})

export default LearnModalBody;