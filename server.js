const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Массив данных
let arr = [
  {
    id: 1,
    title: {
      eng: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      eng: "We use a comprehensive approach that includes close cooperation with the client at every stage. We adhere to transparency and open communication. You will always be aware of the process and will be able to make any desired changes.",
      ru: "Мы используем комплексный подход, включающий в себя тесное сотрудничество с клиентом на каждом этапе. Мы придерживаемся прозрачности и открытого общения. Вы всегда будете в курсе процесса и сможете внести любые желаемые изменения.",
    },
    figure: "figure-1",
  },
];

// Middleware для обработки JSON
app.use(bodyParser.json());

// Middleware для добавления заголовков CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

  // Проверяем наличие вложенных объектов
  if (!title.eng || !title.ru || !description.eng || !description.ru) {
    return res.status(400).send({ message: "Заголовок и описание должны содержать значения для eng и ru." });
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

  // Обновляем только переданные значения
  if (title) {
    arr[index].title = {
      ...arr[index].title,
      ...title, // Перезаписываем только изменённые языковые версии
    };
  }
  if (description) {
    arr[index].description = {
      ...arr[index].description,
      ...description, // Перезаписываем только изменённые языковые версии
    };
  }
  if (figure) {
    arr[index].figure = figure;
  }

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
