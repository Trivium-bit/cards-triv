import React from 'react';
import {Box,Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {setPacksCardsCountAC} from "../../../state/cardPacksReducer";


const SliderBar = () => {

    const arrOfInitialSliderValues = useAppSelector<number[]>(state => state.cardsReducer.sliderValues);
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setPacksCardsCountAC(newValue as number[]));
    };
    return (
        <Box sx={{ width: 250, marginTop: "3rem"}}>
            <Slider
                style={{color: "#21268F"}}
                value={arrOfInitialSliderValues}
                onChange={handleChange}
                valueLabelDisplay="on"
                max={150}
            />
        </Box>
    );
};

export default SliderBar;