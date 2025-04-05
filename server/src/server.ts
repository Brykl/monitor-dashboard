import { Request, Response, Next } from "restify";
import getDiskInfo from "./services/diskInfo";
const corsMiddleware = require('restify-cors-middleware2');
const restify = require('restify');
const getServerInfo = require('./services/serverInfo');
const getCpuUsage = require('./services/cpuInfo');

// Настройка CORS
const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["X-Requested-With"],
});

// Создание сервера Restify
const server = restify.createServer();

server.use(
  function crosOrigin(req: Request, res: Response, next: Next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Главная страница
server.get("/", (req: Request, res: Response, next: Next) => {
  res.send({ message: "Hello, Restify with TypeScript!", test: 'test' });
  next();
});

// Получение информации о сервере
server.get("/server/info", (req: Request, res: Response, next: Next) => {
  res.send({ data: getServerInfo() });
  next();
});

// Получение информации о CPU (с использованием асинхронной функции)
server.get("/server/cpuInfo", async (req: Request, res: Response, next: Next) => {
  try {
    const cpuLoad = await getCpuUsage();  // Ожидаем результат от getCpuUsage
    res.send({ cpuLoad });  // Отправляем результат в ответ
  } catch (error) {
    res.send(500, { error: 'Ошибка получения данных о загрузке CPU' });
  }
  next();
});


server.get("/server/diskInfo", async (req: Request, res: Response, next: Next) => {
  try {
    const diskInfo = await getDiskInfo();  // Получаем информацию о дисках
    res.send({ diskInfo });
  } catch (error) {
    res.send(500, { error: 'Ошибка получения информации о дисках' });
  }
  next();
});

// Запуск сервера
server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
