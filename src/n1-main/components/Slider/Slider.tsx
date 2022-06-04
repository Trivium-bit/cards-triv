import React, {useState} from 'react';
import {Box,Slider} from "@mui/material";


const SliderBar = () => {
    const [value, setValue] = useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <Box sx={{ width: 250 }}>
            <Slider
                style={{color: "#21268F"}}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    );
};

export default SliderBar;