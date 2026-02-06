// import path from 'node:path';

// const somePath = path.join('some_folder', 'some_file.txt');
// на macOS → 'some_folder/some_file.txt'
// на Windows → 'some_folder\\some_file.txt'
//
// import path from "node:path";

// // абсолютний шлях до робочої директорії
// const pathToWorkDir = path.join(process.cwd());

// // додаємо нові частини до шляху
// const pathToFile = path.join(pathToWorkDir, "some_folder", "some_file.txt");
//

// macOS → /коренева_папка/some_folder/some_file.txt
// Windows → C:\\коренева_папка\\some_folder\\some_file.txt
//
// import path from "node:path";

// // macOS
// console.log(path.parse("/home/user/dir/file.txt"));
// /*
/*
// {
root: '/',
dir: '/home/user/dir',
base: 'file.txt', ext: '.txt', name: 'file'
// }
// */

//
//

// // Windows
// console.log(path.parse("C:\\path\\dir\\file.txt"));
/*
// {
root: 'C:\\',
dir: 'C:\\path\\dir',
base: 'file.txt',
ext: '.txt', name: 'file'
// }
*/
// import fs from "node:fs";

// // приклад без кодування
// const buffer = fs.readFileSync("file.txt");
// console.log(buffer); // <Buffer 48 65 6c 6c 6f ...>

// // приклад із кодуванням
// const data = fs.readFileSync("file.txt", "utf8");
// console.log("Вміст файлу:", data); // "Hello"
//
// import fs from "node:fs/promises";

// // без кодування
// const buffer = await fs.readFile("file.txt");
// console.log(buffer); // <Buffer ... >

// // з кодуванням
// const data = await fs.readFile("file.txt", "utf8");
// console.log("Вміст файлу:", data); // "Hello"
// //
//
// import fs from "node:fs/promises";

//fs.writeFile(path, data, options) — асинхронний запис у файл
// await fs.writeFile("output.txt", "Привіт з Node.js!", "utf8");
// console.log("Дані успішно записані у файл.");
//
//
//fs.appendFile(path, data, options) — асинхронне додавання у файл.
//
// import fs from "node:fs/promises";

// await fs.appendFile("output.txt", "\nЩе один рядок", "utf8");
// console.log("Дані успішно додані у файл.");
//
//
//fs.rename(oldPath, newPath) — асинхронне перейменування або переміщення файлу
//
// import fs from "node:fs/promises";

// await fs.rename("oldfile.txt", "newfile.txt");
// console.log("Файл успішно перейменовано.");
//
//
//fs.unlink(path) — асинхронне видалення файлу.
//
// import fs from "node:fs/promises";

// await fs.unlink("file.txt");
// console.log("Файл успішно видалено.");
//
//
// import fs from "node:fs/promises";

// const buffer = await fs.readFile("hello.txt");
// // якщо у файлі hello.txt був текст "Hello World!"

// console.log(buffer);
// // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
//
//
// import fs from "node:fs/promises";

// const buffer = await fs.readFile("hello.txt");
// console.log(buffer.toString("utf-8")); // Hello World!
//
//

//

//---------------------
//2-Middleware y Express
//
// //
//
// src/server.js
// src/server.js
// import express from 'express';

// const app = express();
// const PORT = 3000;

// // Логування часу
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

// // Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Something went wrong');
// });

// // Middleware для обробки помилок
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   res.status(500).json({
//     message: 'Internal Server Error',
//     error: err.message,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
//
// src/server.js
// import express from 'express';

// const app = express();
// const PORT = 3000;

// // Логування часу
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Кореневий маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

// // Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Something went wrong');
// });

// // Middleware 404 (після всіх маршрутів)
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Middleware для обробки помилок (останнє)
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   res.status(500).json({
//     message: 'Internal Server Error',
//     error: err.message,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
//
// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware для парсингу JSON
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.post('/users', (req, res) => {
  console.log(req.body); // тепер тіло доступне як JS-об’єкт
  res.status(201).json({ message: 'User created' });
});
app.use(cors());

// src/server.js

// Решта коду файла

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

// Решта коду файла

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
