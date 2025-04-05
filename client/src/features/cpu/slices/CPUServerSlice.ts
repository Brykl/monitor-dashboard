import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCpuLoad = createAsyncThunk(
    'cpu/fetchCpuLoad',
    async () => {
        const response = await axios.get('http://localhost:8080/server/cpuInfo');
        console.log(response.data.cpuLoad)
        return response.data.cpuLoad;
    }
);




const cpuSlice = createSlice({
    name: 'cpu',
    initialState: {
        load: 0,
        status: 'idle',
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchCpuLoad.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.load = parseFloat(action.payload); 
            })
            .addCase(fetchCpuLoad.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Ошибка получения данных';
            });
    }
});

export default cpuSlice.reducer;
