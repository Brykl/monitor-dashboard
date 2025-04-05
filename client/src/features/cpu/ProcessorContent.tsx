import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { fetchCpuLoad } from "./slices/CPUServerSlice";
import { useDispatch } from "react-redux";

const ProcessorContent = () => {
    const dispatch = useDispatch();

    const cpuLoad = useSelector((state: any) => state.cpuInfo.load);

    const [data, setData] = useState([
        { time: getFormattedTime(), load: 0 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchCpuLoad());
        }, 3000);

        return () => clearInterval(interval); 
    }, [dispatch]);

    useEffect(() => {
        setData((prevData) => {
            const newData = [
                ...prevData,
                { time: getFormattedTime(), load: cpuLoad }
            ];
    
            if (newData.length > 7) {
                newData.shift(); 
            }
    
            return newData;
        });
    }, [cpuLoad]);


    function getFormattedTime() {
        const date = new Date();
        return date.getHours() + ':' +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':' +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    }

    const processorChart = (
        <AreaChart
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: "#ffff" }} />
            <YAxis tick={{ fill: "#ffff" }} domain={[0, 100]} />
            <Tooltip />
            <Area type="monotone" dataKey="load" stroke="#d8ccb5" fill="#d8ccb5" />
        </AreaChart>
    );

    return (
        <Box sx={{ 
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: 4, 
            overflow: 'hidden' 
          }}>
            <Typography variant="h5">CPU load %</Typography>
            <Box sx={{ 
              width: '100%', 
              maxHeight: '400px',  
              overflow: 'auto'  
            }}>
              {processorChart}
            </Box>
          </Box>
          
    );
}

export default ProcessorContent;
