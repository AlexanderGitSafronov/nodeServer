const express = require('express');
const bodyParser = require('body-parser'); // Для обработки тела запросов
const app = express();
const port = 3000;

// Массив данных
let arr = [
  {
    id: 1,
    title: "F",
    description: "asdasdadasd",
    figure: "circle"
  }
];

// Middleware для обработки JSON
app.use(bodyParser.json());

// Middleware для добавления заголовков CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Разрешить запросы с любого источника
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Разрешенные методы
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Разрешенные заголовки
  next();
});

// Базовый маршрут (GET)
app.get('/', (req, res) => {
  res.send(arr);
});

// POST: Добавление нового элемента
app.post('/', (req, res) => {
  const { id, title, description, figure } = req.body;
  if (!id || !title || !description || !figure) {
    return res.status(400).send({ message: "Все поля обязательны!" });
  }
  arr.push({ id, title, description, figure });
  res.status(201).send({ message: "Элемент добавлен", arr });
});

// PUT: Обновление элемента по ID
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, figure } = req.body;
  const index = arr.findIndex(item => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send({ message: "Элемент не найден" });
  }

  if (title) arr[index].title = title;
  if (description) arr[index].description = description;
  if (figure) arr[index].figure = figure;

  res.send({ message: "Элемент обновлен", arr });
});

// DELETE: Удаление элемента по ID
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = arr.findIndex(item => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send({ message: "Элемент не найден" });
  }

  arr.splice(index, 1);
  res.send({ message: "Элемент удален", arr });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
