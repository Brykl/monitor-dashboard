import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const fetchInfoOfServer = createAsyncThunk(
    'serverInfo/fetchInfoOfServer',
    async () => {
        try {
            const response = await axios.get("http://localhost:8080/server/info");
        return response.data;
        } catch (err: any) {
            console.error(err, 'Client could not get a data from server')
            
        }
    }
)

interface MemoryInfo {
    total: number;
    free: number;
  }
  
  interface NetworkInfo {
      address: string;
  }
  
  interface CPUInfo {
    model: string;
    speed: number;
    times: {
      user: number;
      nice: number;
      sys: number;
      idle: number;
      irq: number;
    };
  }
  
  interface ServerInfo {
    data: {
        cpu: CPUInfo[] | undefined;
        platform: string | undefined;  
        arch: string | undefined;
        release: string | undefined;
        loadavg: number[] | undefined;
        memory: MemoryInfo | undefined;
        hostName: string | undefined;
        upTime: number | undefined;
        maindir: string | undefined,
        network: NetworkInfo | undefined;
    }
  }

  const initialState: ServerInfo = {
        data: {
            cpu: undefined,
            platform: undefined,
            arch: undefined,
            release: undefined,
            loadavg: undefined,
            memory: undefined,
            hostName: undefined,
            upTime: undefined,
            maindir: undefined,
            network: undefined,
        }
  } 


 const DataAboutServerSlice = createSlice({
    name: 'dataAboutServer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfoOfServer.fulfilled, (state, action) => {
                return {...state, ...action.payload}
            })
            .addCase(fetchInfoOfServer.rejected, ( _ , action) => {
                console.error('Failed to fetch server info:', action.error.message)
            })
    }
})

export const {} = DataAboutServerSlice.actions;
export default DataAboutServerSlice.reducer;
export { fetchInfoOfServer };