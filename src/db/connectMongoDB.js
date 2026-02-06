// // src/db/connectMongoDB.js
// import { Model, model } from 'mongoose';

// export const connectMongoDB = async () => {
//   try {
//     const mongoUrl = process.env.MONGO_URL;
//     await Model.connect(mongoUrl);
//     console.log('✅ MongoDB connection established successfully');
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB:', error.message);
//     process.exit(1); // аварійне завершення програми
//   }
// };
// // src/models/student.js

// import { Schema } from 'mongoose';

// const studentSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true, // прибирає пробіли на початку та в кінці
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//       enum: ['male', 'female', 'other'],
//     },
//     avgMark: {
//       type: Number,
//       required: true,
//     },
//     onDuty: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// // src/server.js

// import { Student } from './models/student.js';
// // Код імпортів та підключення middleware бібліотек

// app.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// // Код 404 та error middleware, підключення до бази даних та старт сервера

// export const Student = model('Student', studentSchema);

// app.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json(student);
// });
//
//
// src/server.js

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Student } from './models/student.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// GET /students — список усіх студентів
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// GET /students/:studentId — один студент за id
app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.status(200).json(student);
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

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

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
