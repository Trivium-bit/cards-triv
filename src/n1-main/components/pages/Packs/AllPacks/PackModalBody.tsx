import React, {ChangeEvent, useState, forwardRef, useEffect} from 'react';
import {Box, FormControlLabel, Radio, RadioGroup, Paper} from "@mui/material";
import Button from "../../../../../Common/Components/Button";
import {useAppDispatch, useAppSelector} from "../../../../../state/store";
import {getCardsSelector} from "../../../../../Common/Selectors/Selectors";
import {getCardsTC} from "../../../../../state/cardsReducer";
import modalStyles from "../../../Modals/ModalStyles.module.scss";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#F9F9FE',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export interface PackModalBodyPropsType {
    openAnswer: any;
    onCancel: () => void;
}

const QUESTION = "QUESTION";
const ANSWER = "ANSWER";

const PackModalBody = forwardRef(({openAnswer, onCancel}: PackModalBodyPropsType, ref: any) => {
    const cards = useAppSelector(getCardsSelector);
    const dispatch = useAppDispatch();
    const currentCard = cards[0];

    const [step, setStep] = useState<typeof QUESTION | typeof ANSWER>(QUESTION)
    const [selectedRatio, setSelectedRatio] = useState<string | boolean>(false)

    const handleChangeRatio = (e: ChangeEvent<HTMLInputElement>, value:string) => {
        setSelectedRatio(value)
    }

    const handleCancel = () => onCancel()
    const handleSubmit = () => {
        if (step === QUESTION) {
            return setStep(ANSWER);
        }

        setStep(QUESTION);
        setSelectedRatio(false)
    }

    useEffect(() => {
        dispatch(getCardsTC({
            cardsPack_id: openAnswer._id,
            pageCount: 1000000
        }))
    }, []);

    console.log(cards)

    return (
        <Paper tabIndex={-1} ref={ref}>
            <Box sx={modalStyle} className={modalStyles.modalBlock} >
                <h1 className={modalStyles.modalTitle}>Learn {openAnswer?.name}</h1>
                <p className={modalStyles.modalText}><b>Question:</b>{currentCard.question}</p>
                {step === ANSWER && (
                    (
                        <>
                            <p className={modalStyles.modalText}><b>Answer:</b>{currentCard.answer}</p>
                            <p className={modalStyles.modalText}><b>Rate yourself:</b></p>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                onChange={handleChangeRatio}
                            >
                                <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                                <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                                <FormControlLabel value="4" control={<Radio/>} label="Confused"/>
                                <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>
                            </RadioGroup>
                        </>
                    )
                )}
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