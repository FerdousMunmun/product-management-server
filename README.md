# Product Management Backend API

A RESTful backend API for managing products, categories, and users with JWT authentication. Built using Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Features

- User Authentication (JWT)
- User Management
- Product Management
- Category Management
- PostgreSQL Database
- Prisma ORM
- TypeScript Support
- Protected Routes
- REST API Architecture
- Environment Variable Configuration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (JSON Web Token)
- bcrypt
- CORS

## Project Structure

```bash
src/
│
├── app.ts
├── server.ts
│
├── lib/
│   └── prisma.ts
│
├── routes/
│   └── index.ts
│
├── middleware/
│   └── auth.ts
│
├── services/
│   ├── auth/
│   ├── users/
│   ├── products/
│   └── categories/
│
└── generated/
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd product-management-server
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

## Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run Database Migration:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

## Run Project

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Base URL

### Local

```http
http://localhost:5000/api/v1
```

### Production

```http
https://your-domain.vercel.app/api/v1
```

## Authentication Endpoints

### Register User

```http
POST /api/v1/auth/register
```

Request Body

```json
{
  "name": "Admin",
  "email": "admin2@gmail.com",
  "password": "123456"
}
```

### Login User

```http
POST /api/v1/auth/login
```

Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "token": "jwt_token"
}
```

## Category Endpoints

### Get All Categories

```http
GET /api/v1/categories
```

### Create Category

```http
POST /api/v1/categories
```

Request Body

```json
{
  "name": "Electronics"
}
```

## Product Endpoints

### Get All Products

```http
GET /api/v1/products
```

### Get Single Product

```http
GET /api/v1/products/:id
```

### Create Product

```http
POST /api/v1/products
```

Request Body

```json
{
  "title": "Laptop",
  "description": "Gaming Laptop",
  "price": 1500,
  "categoryId": "category_id",
  "userId": "user_id"
}
```

### Update Product

```http
PATCH /api/v1/products/:id
```

### Delete Product

```http
DELETE /api/v1/products/:id
```

## User Endpoints

### Get All Users

```http
GET /api/v1/users
```

### Get Single User

```http
GET /api/v1/users/:id
```

## Deployment

### Vercel Deployment

1. Push project to GitHub
2. Import repository into Vercel
3. Add Environment Variables

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

4. Deploy Project

## Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "prisma generate && tsc",
  "start": "node dist/server.js"
}
```

## Author

Jannatul Ferdous

GitHub:
https://github.com/FerdousMunmun

## License

This project is licensed under the ISC License.
