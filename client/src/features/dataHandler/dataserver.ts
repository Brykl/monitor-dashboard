import { useEffect, useState } from "react";
import {fetchInfoOfServer} from './slices/dataAboutServerSlice'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function InfoServerData() {
  const [serverInfo, setServerInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState("");


  const dispatch = useDispatch();
  const dataFromServer = useSelector(state => state.dataAboutServer)
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchInfoOfServer())
      console.log(dataFromServer.data)
      setServerInfo(dataFromServer)
    }, 2000)

    return () => clearInterval(interval);

  }, [dataFromServer]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime =
        now.getHours() +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  if (!serverInfo) return null;

  return {
    platform: serverInfo?.data?.platform,
    arch: serverInfo?.data?.arch,
    allMem: (serverInfo?.data?.memory?.total / 1024 / 1024 / 1024).toFixed(2),
    freeMem: (serverInfo?.data?.memory?.free / 1024 / 1024 / 1024).toFixed(2),
    homDir: serverInfo?.data?.maindir,
    netInfo: serverInfo?.data?.network?.address,
    procInfo: serverInfo?.data?.cpu?.[0]?.model, 
    time: currentTime,
    upTime: serverInfo.data.upTime ,
  };
}
