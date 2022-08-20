import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'

type PageCountPropsType = {
    callback: (value: number) => void
    pageCount: number
}


export const PageCount = ({callback, pageCount}: PageCountPropsType) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        callback(+event.target.value)
    }

    return (
        <Box sx={{width: 220}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{color: '#646464'}}>show</div>
                <div>
                    <FormControl fullWidth>
                        <NativeSelect
                            onChange={onChangeHandler}
                            defaultValue={pageCount}
                        >
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={16}>16</option>
                            <option value={32}>32</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <div style={{color: '#646464'}}>packs per page</div>
            </div>
        </Box>
    )
}

