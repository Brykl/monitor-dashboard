import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import memoryInfo from "../dataHandler/diskData";
import { useState, useEffect } from "react";

const COLORS = ["#d5c7aa", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DiskContent() {
  const [freeDisk, setFreeDisk] = useState<number | string | undefined>(undefined);
  const [usedSpace, setUsedSpace] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      memoryInfo()
        .then((memObj) => {
          setFreeDisk(memObj.diskInfo[0].free);
          setUsedSpace(memObj.diskInfo[0].used);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о диске:', error);
        });
    }, 500);
  
    return () => clearInterval(intervalId);
  }, []);

  const data = [
    { name: "free", value: Number(usedSpace) },
    { name: "full", value: Number(freeDisk) },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        width: "100%", 
        padding: 2,
        overflow: "hidden", 
      }}
    >
      <Typography variant="h5">Free space C:</Typography>

      <Box
        sx={{
          height: "300px",  
          width: "100%",  
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", 
        }}
      >
        <PieChart width={300} height={300}>  
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_empty, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: "#d5c7aa",
              marginTop: 0.8,
              marginLeft: 20,
              marginRight: 0.5,
            }}
          ></Box>
          <Typography>Used space</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: "#00C49F",
              marginTop: 0.8,
              marginLeft: 20,
              marginRight: 0.5,
            }}
          ></Box>
          <Typography>Free space</Typography>
        </Box>
      </Box>
    </Box>
  );
}
