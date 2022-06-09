import React from 'react';
import {Box,Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {setPacksCardsCountAC} from "../../../state/cardPacksReducer";


const SliderBar = () => {
    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const arrOfInitialSliderValues = [min, max];
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        // @ts-ignore
        dispatch(setPacksCardsCountAC(newValue[0], newValue[1] as number));
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