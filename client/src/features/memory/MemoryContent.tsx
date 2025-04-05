import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInfoOfServer } from '../dataHandler/slices/dataAboutServerSlice';

function GpuCoreComponent() {
  const dispatch = useDispatch();
  const serverInfo = useSelector((state: any) => state.dataAboutServer?.data);

  const [load, setLoad] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchInfoOfServer());

    const intervalId = setInterval(() => {
      dispatch(fetchInfoOfServer());
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (serverInfo?.memory?.total && serverInfo?.memory?.free) {
      const allMem = serverInfo.memory.total / 1024 / 1024 / 1024;
      const freeMem = serverInfo.memory.free / 1024 / 1024 / 1024;

      if (allMem > 0) {
        const usedMem = allMem - freeMem;
        const usedmemPerCent =  Math.floor((usedMem / allMem) * 100);
        setLoad(usedmemPerCent);
      }
    }
  }, [serverInfo]);

  return (
    <Box>
      <Typography>{load}%</Typography>
      <Box
        sx={{
          width: '500px',
          height: '350px',
          backgroundColor: '#bbb899',
          display: 'flex',
          alignItems: 'end',
          border: '0.1px solid white',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '500px',
            height: `${load}%`,
            backgroundColor: '#d5c7aa',
            transition: 'height 1s ease'
          }}
        />
      </Box>
    </Box>
  );
}

const MemoryContent = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
        alignItems: 'center',
        
      }}
    >
      <Typography variant="h5">Memory Load</Typography>
      <GpuCoreComponent />
    </Box>
  );
};

export default MemoryContent;
