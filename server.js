const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Подключение к базе данных успешно"))
  .catch(err => console.error("Ошибка подключения к базе данных:", err));

// Модель данных
const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  figure: { type: String, required: true }
});

const DataModel = mongoose.model("Data", DataSchema);

// Массив пользователей
const users = [
  { username: "admin", password: "$2b$10$W1r7LZt5VrPpXPyHvWrvNOE9Xa7D48hHzMugpxh3wrzYmW7OnAkWG" }, // пароль "123456"
  { username: "user", password: "$2b$10$dmMIOzTnCsB5kHfayUatpe67dhcwlYCU2GxbyNmQY6qBVO69IW1Dm" } // пароль "password"
];

// Middleware
app.use(express.json());

// Middleware для проверки токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Неверный или истёкший токен" });
    }
    req.user = user;
    next();
  });
}

// Маршрут для входа
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Неверное имя пользователя или пароль" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Неверное имя пользователя или пароль" });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Вход успешен", token });
});

// Защищённые маршруты
app.get("/data", authenticateToken, async (req, res) => {
  const data = await DataModel.find();
  res.json(data);
});

app.post("/data", authenticateToken, async (req, res) => {
  const { title, description, figure } = req.body;
  const newData = new DataModel({ title, description, figure });
  const savedData = await newData.save();
  res.status(201).json(savedData);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
