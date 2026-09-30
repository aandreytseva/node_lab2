# Лабораторная работа №2

## Создание REST API на Express.js

**Студент:** Andreiteva Anastasia
**Группа:** IAFR-2302

## Цель работы

Познакомиться с framework Express.js, научиться создавать маршруты, работать с параметрами URL
и query parameters, возвращать данные в формате JSON и организовывать проект в соответствии
с архитектурой MVC.

## Технологии

- Node.js
- Express.js
- Архитектура MVC (Model-View-Controller)

## Структура проекта

```
lab2/
├── app.js                        # точка входа, подключение middleware и маршрутов
├── package.json                   # описание проекта и зависимости
├── routes/
│   ├── bookRoutes.js              # маршруты для книг
│   └── authorRoutes.js            # маршруты для авторов
├── controllers/
│   ├── bookController.js          # логика обработки запросов (книги)
│   └── authorController.js        # логика обработки запросов (авторы)
├── models/
│   ├── bookModel.js               # данные книг
│   └── authorModel.js             # данные авторов
├── middleware/
│   └── logger.js                  # middleware логирования запросов
└── README.md
```

## Установка и запуск

```bash
npm install
node app.js
```

Сервер запустится на `http://localhost:3000`.

## Реализованные маршруты

### Книги

| Метод  | URL                          | Назначение                                     |
|--------|------------------------------|------------------------------------------------|
| GET    | `/api/books`                 | Получение всех книг                              |
| GET    | `/api/books?genre=fantasy`   | Фильтрация по жанру                              |
| GET    | `/api/books?year=2008`       | Фильтрация по году                               |
| GET    | `/api/books?genre=fantasy&year=1937` | Одновременная фильтрация               |
| GET    | `/api/books/search?title=node` | Поиск книги по части названия (без учёта регистра) |
| GET    | `/api/books/:id`             | Получение книги по ID                             |
| POST   | `/api/books`                 | Добавление новой книги                            |
| PATCH  | `/api/books/:id`             | Обновление книги                                  |
| DELETE | `/api/books/:id`             | Удаление книги                                    |

### Авторы

| Метод | URL                       | Назначение                       |
|-------|---------------------------|----------------------------------|
| GET   | `/api/authors`            | Получение всех авторов            |
| GET   | `/api/authors/:id`        | Получение автора по ID            |
| GET   | `/api/authors/:id/books`  | Получение книг выбранного автора  |

### Прочее

| Метод | URL               | Назначение                                                  |
|-------|-------------------|-------------------------------------------------------------|
| GET   | `/api/statistics`  | Статистика: кол-во книг, авторов, жанров, новейшая/старейшая книга |
| любой | любой неизвестный  | `{ "error": "Route not found" }` с HTTP-статусом 404         |

## Примеры запросов и ответов

### Получение всех книг

```
GET /api/books
```

```json
[
  { "id": 1, "title": "The Hobbit", "authorId": 1, "genre": "fantasy", "year": 1937 },
  { "id": 2, "title": "1984", "authorId": 2, "genre": "dystopia", "year": 1949 },
  ...
]
```

### Добавление книги

```
POST /api/books
Content-Type: application/json

{ "title": "Brave New World", "authorId": 2, "genre": "dystopia", "year": 1932 }
```

Ответ (`201 Created`):

```json
{ "id": 7, "title": "Brave New World", "authorId": 2, "genre": "dystopia", "year": 1932 }
```

### Валидация: отсутствие обязательного поля

```
POST /api/books
{ "title": "No Author" }
```

Ответ (`400 Bad Request`):

```json
{ "error": "Fields title, authorId, genre and year are required" }
```

### Валидация: несуществующий автор (задание 8.3)

```
POST /api/books
{ "title": "Test", "authorId": 999, "genre": "test", "year": 2020 }
```

Ответ (`400 Bad Request`):

```json
{ "error": "Author with id 999 not found" }
```

### Статистика

```
GET /api/statistics
```

```json
{
  "totalBooks": 6,
  "totalAuthors": 4,
  "totalGenres": 5,
  "genres": ["fantasy", "dystopia", "satire", "novel", "programming"],
  "newestBook": { "id": 6, "title": "Clean Code", "authorId": 4, "genre": "programming", "year": 2008 },
  "oldestBook": { "id": 5, "title": "Crime and Punishment", "authorId": 3, "genre": "novel", "year": 1866 }
}
```

## Middleware — логирование

Каждый запрос логируется в консоль в формате:

```
HTTP Method | URL | Date and Time
```

Например:

```
GET | /api/books | 30.09.2026 14:25
```

## Вывод

В ходе выполнения лабораторной работы был изучен framework Express.js и реализован REST API
с полным CRUD для книг и чтением авторов. Проект организован по архитектуре MVC: данные вынесены
в models, логика обработки — в controllers, маршрутизация — в routes. Реализованы фильтрация
по жанру и году, поиск по названию без учёта регистра, статистика, middleware логирования,
валидация обязательных полей и проверка существования автора при добавлении книги.
