import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type PropsType = {
    min: number
    max: number
    width: number
    minDistance: number
    newMin: undefined | number
    newMax: undefined | number
    callback?: (value: number[]) => void
}

export const RangeTable = ({minDistance, min, max, callback, width, newMin, newMax}: PropsType) => {

    let minInitial = newMin ? newMin : min
    let maxInitial = newMax ? newMax : max

    const [value, setValue] = React.useState<number[]>([minInitial, maxInitial]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }

    };

    const onChangeCommittedHandler = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        Array.isArray(value) && callback && callback(value)
    }

    return (
        <div style={{maxWidth: '350px'}}>
            <h2 style={{margin: '30px 0', color: '#646464'}}>amount of cards</h2>
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <h2 style={{
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#e0e0e0',
                    color: 'black',
                    padding: '5px 0',
                    borderRadius: 3,
                }}>{minInitial}</h2>
                <Box sx={{width}}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={onChangeCommittedHandler}
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        disableSwap
                    />
                </Box>
                <h2 style={{
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#e0e0e0',
                    color: 'black',
                    padding: '5px 0',
                    borderRadius: 3,
                }}>{maxInitial}</h2>
            </div>
        </div>

    );
};