//1-vstyp y node.js
// import fs from 'node:fs/promises';

// //Top level await
// const data = await fs.readFile("./data.json", "utf-8");
// const json =JSON.parse(data);

// console.log(data);
//console.log(json[0].name);

//------------------
// import http from 'node:http';
// const PORT= 3000;

// //Endpoint
// //localhost:3000/
// //localhost:3000/health
// //localhost:3000/about

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     if(req.url === "/" && req.method === 'GET'){
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({message:"Welcome to the home route!"}));
//         return;
//     };
//     if(req.url === "/health" && req.method === "GET"){
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({status: "Ok"}));
//         return;
//     }

//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello, Node.js!');
// });
// server.listen(PORT, ()=> {
//     console.log(`Server is running at http://localhost:${PORT}/`);
// });

//----------------
// import express from 'express';

// const app = express();

// //GET localhost:3000/
// //GET localhost:3000/health

// //Middleware - function

// app.use(express.json());

// app.use((req, res, next)=> {
//     console.log("app.use",req.url, req.method);
//     next();
// })
// app.get('/', (req, res) => {
//     console.log(req.url, req.method);
//     res.status(200).json({message: 'Welcme to home route'});
// });
// app.get('/notes', (req, res)=> {
//     res.status(200).json({message: 'All notes'})
// });
// app.get('/notes/:noteId',(req, res)=> {
//     const {noteId} =req.params;
//     res.status(200).json({message: 'Note with id ${noteId}'});
// });
// app.get("/health", (req, res) => {
//     res.status(200).json({status: "Ok!"});
// });
// app.post('/notes', (req, res) => {
//     console.log(req.body);
//     const newNote={
//         id: Date.now(),
//         completed: false,
//         ...req.body
//     }
//     res.status(201).json(newNote);
// })
// app.listen(3000, ()=> {
//     console.log("Server is running on port 3000");
// })

//---------------------
//2-Middleware y Express
//
// import express from "express";

// const PORT= 3000;

// const app =  express();

// const myMiddleware= (req, res, next) => {
//     console.log(req.url, req.method);
//     next();
// };
// app.use(myMiddleware);

// app.get('/students', (req, res)=> {
//     res.status(200).json({msg: 'All students!'});
// });

// app.get('/students/:studentId', (req, res) => {
//     const {studentId} =req.params;
// res.status(200).json({msg: `Student with id ${studentId}!`});
// });

// app.listen(PORT, ()=>{
//     console.log(`Serveis running on http://localhost:${PORT}`);
// });
//
//
// src/server.js
//
//

//
// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import { connectMongoDB } from './db/connectMongoDB.js';

// const app = express();

// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT ?? 3030;

// /* Middleware та маршрути */

// // підключення до MongoDB
// await connectMongoDB();

// // запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
//
// src/server.js

// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import { connectMongoDB } from './db/connectMongoDB.js';
// import { Student } from './models/student.js';

// const app = express();
// const PORT = process.env.PORT ?? 3000;

// app.use(express.json());
// app.use(cors());

// // GET /students — список усіх студентів
// app.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// // GET /students/:studentId — один студент за id
// app.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);
//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }
//   res.status(200).json(student);
// });

// // Middleware 404
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Middleware для обробки помилок
// app.use((err, req, res, next) => {
//   console.error(err);

//   const isProd = process.env.NODE_ENV === 'production';

//   res.status(500).json({
//     message: isProd
//       ? 'Something went wrong. Please try again later.'
//       : err.message,
//   });
// });

// await connectMongoDB();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
//
//
// src/server.js
// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';

// import { connectMongoDB } from './db/connectMongoDB.js';
// import { logger } from './middleware/logger.js';
// import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { errorHandler } from './middleware/errorHandler.js';

// const app = express();
// const PORT = process.env.PORT ?? 3000;

// // Глобальні middleware
// app.use(logger); // 1. Логер першим — бачить усі запити
// app.use(express.json()); // 2. Парсинг JSON-тіла
// app.use(cors()); // 3. Дозвіл для запитів з інших доменів

// // ...тут ваші маршрути

// // 404 — якщо маршрут не знайдено
// app.use(notFoundHandler);

// // Error — якщо під час запиту виникла помилка
// app.use(errorHandler);

// await connectMongoDB();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
//
//
// src/server.js

import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// глобальні middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// підключаємо групу маршрутів студента
app.use(studentsRoutes);

// 404 і обробник помилок — наприкінці ланцюжка
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
