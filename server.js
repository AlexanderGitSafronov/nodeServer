const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let arr = [
  {
    id: 1,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 2,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 3,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 4,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 5,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 6,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
    },
    figure: "figure-1",
  },
  {
    id: 7,
    tags: {
      ru: ["Телеграм", "API"],
      en: ["Telegram", "API"],
    },
    title: {
      en: "Website development",
      ru: "Разработка сайтов",
    },
    description: {
      en: "We use a comprehensive approach...",
      ru: "Мы используем комплексный подход...",
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
  const { id, tags, title, description, figure } = req.body;

  if (!id || !tags || !title || !description || !figure) {
    return res.status(400).send({ message: "Все поля обязательны!" });
  }

  // Проверяем наличие вложенных объектов
  if (!tags.ru || !tags.en || !title.en || !title.ru || !description.en || !description.ru) {
    return res.status(400).send({ message: "Все вложенные значения должны быть указаны (tags, title, description)." });
  }

  arr.push({ id, tags, title, description, figure });
  res.status(201).send({ message: "Элемент добавлен", arr });
});

// PUT: Обновление элемента по ID
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tags, title, description, figure } = req.body;
  const index = arr.findIndex(item => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send({ message: "Элемент не найден" });
  }

  // Обновляем только переданные значения
  if (tags) {
    arr[index].tags = {
      ...arr[index].tags,
      ...tags, // Перезаписываем только изменённые языковые версии
    };
  }
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
