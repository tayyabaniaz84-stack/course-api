# Course API — Express.js REST API (Modular MVC)

REST API with **JWT authentication**, **Category CRUD** and **Course CRUD**.
Stack: Node.js, Express.js, NeDB (pure-JavaScript file database, no installation or compiler needed), JWT, bcrypt, express-validator.

## Setup

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm start                 # or: npm run dev
```

Server runs on `http://localhost:3000`. The database files are created automatically inside the `data/` folder.

## Project Structure (Modular MVC)

```
server.js                      # entry point (DB connect + listen)
src/
  app.js                       # express app, routes mounting
  config/db.js                 # database (NeDB) setup
  models/                      # M — BaseModel, User, Category, Course
  controllers/                 # C — business logic per module
  routes/                      # route definitions per module
  middlewares/                 # auth (JWT), validate, errorHandler/404
  validators/                  # express-validator rules per module
```

## Endpoints

| Module | Method | URL | Auth | Success |
|---|---|---|---|---|
| Auth | POST | `/api/auth/register` | – | 201 |
| Auth | POST | `/api/auth/login` | – | 200 |
| Auth | GET | `/api/auth/me` | Bearer | 200 |
| Category | POST | `/api/categories` | Bearer | 201 |
| Category | GET | `/api/categories` | – | 200 |
| Category | GET | `/api/categories/:id` | – | 200 |
| Category | PUT | `/api/categories/:id` | Bearer | 200 |
| Category | DELETE | `/api/categories/:id` | Bearer | 200 |
| Course | POST | `/api/courses` | Bearer | 201 |
| Course | GET | `/api/courses` (`?categoryId=1`) | – | 200 |
| Course | GET | `/api/courses/:id` | – | 200 |
| Course | PUT | `/api/courses/:id` | Bearer | 200 |
| Course | DELETE | `/api/courses/:id` | Bearer | 200 |

Protected routes need the header: `Authorization: Bearer <token>` (token comes from register/login).

## Request bodies

**Register** `{ "name": "Tayyaba", "email": "tayyaba@example.com", "password": "secret123" }`
**Login** `{ "email": "tayyaba@example.com", "password": "secret123" }`
**Category** `{ "name": "Web Development", "description": "Frontend and backend courses" }`
**Course** `{ "title": "Express.js Mastery", "price": 49.99, "duration": 20, "instructor": "Ali", "categoryId": 1, "description": "..." }`

## Error responses

- `400` validation error — `{ "success": false, "message": "Validation failed", "errors": [{ "field": "name", "message": "Category name is required" }] }`
- `401` missing / invalid token, wrong login credentials
- `404` unknown ID (`Category not found with id 999`) or unknown URL (`Route not found: GET /api/unknown`)
- `409` duplicate email / category name

## Postman evidence checklist

Import `postman_collection.json` (folders are numbered 1–5 in the same order as the assignment).
Run `Register` / `Login` first — the collection saves the token automatically as `{{token}}`.

1. Register + Login (201 / 200)
2. POST `/api/categories` → 201 Created
3. GET `/api/categories` → 200 OK
4. POST `/api/categories` with empty body → 400 Bad Request
5. GET `/api/categories/999` or `/api/unknown` → 404 Not Found
