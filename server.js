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
  {
    id: 2,
    title: {
      eng: "Web application development ",
      ru: "Разработка Веб приложений ",
    },
    description: {
      eng: "We create mobile applications for iOS and Android to increase your income and automate business processes. We create Unique design, intuitive interface and functionality. Mobile application strengthens customer loyalty and improves the quality of customer service.",
      ru: "Создаём мобильные приложения для iOS и Android для Увеличения Вашего дохода и автоматизации бизнес процессов. Мы создаем Уникальный дизайн, интуитивно понятный интерфейс и функционал. Мобильное приложение укрепляет лояльность клиентов и повышает качество клиентского сервиса.",
    },
    figure: "figure-1",
  },
  {
    id: 3,
    title: {
      eng: "Development of chatbots and parsers in Telegram",
      ru: "Разработка чат-ботов и парсеров в Telegram",
    },
    description: {
      eng: "We develop Bots with a wide range of functionality: from CRM systems, online stores and restaurants to mailing lists and quality control of employees. And also Parsers - programs that collect the necessary content from different sources. Usually it is used when you need to collect an impressive array of data or do it regularly.",
      ru: "Разрабатываем Боты с широким функционалом: от CRM систем , онлайн магазинов и ресторанов до рассылок и контроля качества работы сотрудников. А так же Парсеры — программы, которые собирают нужный контент с разных источников. Обычно ей пользуются, когда нужно собрать внушительный массив данных или делать это регулярно.",
    },
    figure: "figure-1",
  },
  {
    id: 4,
    title: {
      eng: "Analytics and audit",
      ru: "Аналитика и аудит",
    },
    description: {
      eng: "Website audit at Target Science is conducted by experienced SEO experts. We scrutinize your project, studying the site to identify possible errors that prevent quality promotion and make a strategy to correct them.",
      ru: "Аудит сайта в Target Science проводится опытными SEO-экспертами. Мы тщательно прорабатываем Ваш проект, изучая сайт, для выявления возможных ошибок, которые препятствуют качественному продвижению и составляем стратегию исправления их.",
    },
    figure: "figure-1",
  },
  {
    id: 5,
    title: {
      eng: "SEO promotion",
      ru: "SEO-продвижение",
    },
    description: {
      eng: "Optimizing a website gives traffic to the site from search engines. This traffic channel, like any other, has the unique ability to Hot traffic Users are looking for a product or service on their own and to do so, they type queries into a search engine. Importantly, they are searching for it in real time. Therefore, organic traffic is one of the highest quality and most profitable channels for attracting traffic.",
      ru: "Оптимизация сайта дает трафик на сайт из поисковиков. Этот канал трафика, как и любой другой, обладает уникальной возможностью Горячего трафика Пользователи сами ищут товар или услугу и для этого вбивают запросы в поиске. Важно, что они ищут это в режиме реального времени. Поэтому органический трафик – один из самых качественных и выгодных каналов привлечения трафика.",
    },
    figure: "figure-1",
  },
  {
    id: 6,
    title: {
      eng: "Mobile apps",
      ru: "Мобильные приложения",
    },
    description: {
      eng: "A company that wants to increase its influence and profits with this solution has a chance to achieve tremendous success in business development. The use of the device's capabilities leads to a more extensive and convenient interaction with the user, and thus increase the number of sales.",
      ru: "Компания желающая повысить свое влияние и прибыль с помощью этого решения, имеет шанс достигнуть колоссальных успехов в развитии бизнеса. Использование возможностей устройства приводит к более объёмному и удобному взаимодействию с пользователем, а значит увеличивать количество продаж.",
    },
    figure: "figure-1",
  },
  {
    id: 7,
    title: {
      eng: "SMM promotion",
      ru: "SMM-продвижение",
    },
    description: {
      eng: "Nowadays, SMM is an important tool for business development and building a strong brand. 4.8 billion people scroll through feeds every day - that's more than half of the world's population. Our marketing team knows how to maximize your target audience and build brand influence.",
      ru: "В наше время SMM является Важным инструментом для развития бизнеса и создания сильного бренда. 4,8 млрд человек , каждый день скроллят ленты — это больше половины населения мира. Команда наших маркетологов знает, как увеличить целевую аудиторию и укрепить влиятельность бренда.",
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
