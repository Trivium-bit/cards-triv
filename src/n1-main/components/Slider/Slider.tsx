import React, {useEffect, useState} from 'react';
import {Box,Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {setPacksCardsCountAC} from "../../../state/cardPacksReducer";
import {useDebounce} from "use-debounce";
import {setAppStatusAC} from "../../../state/app-reducer";

export const debounceDelay = 500;
const SliderBar = React.memo(() => {

    const min = useAppSelector<number>(state => state.cardPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardPacksReducer.max);
    const arrOfInitialSliderValues = [min, max];
    const dispatch = useAppDispatch();
    const [values, setValues] = useState<number[]>(arrOfInitialSliderValues)
    const [debouncedValues] = useDebounce(values, debounceDelay);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValues(newValue as number[])
        dispatch(setAppStatusAC("loading"));
    };


    useEffect(() => {
        const [debouncedMin, debouncedMax] = debouncedValues
        dispatch(setPacksCardsCountAC(debouncedMin, debouncedMax));
    }, [debouncedValues, dispatch])

    return (
        <Box sx={{ marginTop: "3rem" }}>
            <Slider
                style={{color: "#21268F"}}
                value={values}
                onChange={handleChange}
                valueLabelDisplay="on"
                max={111}
            />
        </Box>
    );
});

export default React.memo(SliderBar);