import { configureStore } from '@reduxjs/toolkit'
import DataAboutServerReducer from '../features/dataHandler/slices/dataAboutServerSlice'
import  cpuReducer  from '../features/cpu/slices/CPUServerSlice'


export const store = configureStore({
    reducer: {
        dataAboutServer: DataAboutServerReducer,
        cpuInfo: cpuReducer,
    }
})