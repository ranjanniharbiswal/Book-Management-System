# Book-Management-System
Designed and implemented a REST API for book management with Node.js and TypeScript, leveraging PostgreSQL and Prisma for data persistence and bulk CSV import.

## 🚀 Features

- ✅ Full CRUD operations for books
- ✅ Bulk CSV import with validation
- ✅ PostgreSQL database with Prisma ORM
- ✅ TypeScript for type safety
- ✅ Request validation middleware
- ✅ Centralized error handling
- ✅ Logging with Morgan
- ✅ Unit tests with Jest
- ✅ MVC architecture

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **File Upload:** Multer
- **Testing:** Jest & Supertest
- **Logging:** Morgan

## 📋 Prerequisites

- Node.js (v20)
- PostgreSQL (v17)
- npm

## 🔧 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ranjanniharbiswal/Book-Management-System.git
cd book-management
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bookdb?schema=public"
PORT=3000
NODE_ENV=development
```

4. **Set up the database:**
```bash
# Create database and run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

5. **Start the development server:**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a specific book |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| POST | `/books/import` | Import books from CSV |

### Request Examples

**Create a Book:**
```bash
POST http://localhost:3000/books \
  "Content-Type: application/json" \
  '{
    "title": "Auto - Biography",
    "author": "Nihar",
    "publishedYear": 2026
  }'
```

**Get All Books:**
```bash
GET http://localhost:3000/books
```

**Update a Book:**
```bash
 PUT http://localhost:3000/books/{id} \
  "Content-Type: application/json" \
  '{
    "title": "The Great Book - Special Edition",
    "publishedYear": 2026
  }'
```

**Import Books from CSV:**
```bash
  POST http://localhost:3000/books/import \
  "Content-Type: multipart/form-data" \
  "file=@books.csv"

```

### CSV Import Format

The CSV file should have the following format:
```csv
titleExample,authorExample,publishedYearExample
2026,George Orwell,2025
To Kill a Mockingbird,Harper Lee,1960
Pride and Prejudice,Jane Austen,1813
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🗄️ Database Management

**Open Prisma Studio (Database GUI):**
```bash
npm run prisma:studio
```

**Create a new migration:**
```bash
npx prisma migrate dev --name migration_name
```

**Reset database:**
```bash
npx prisma migrate reset
```

## 📦 Project Structure

```
book-management-api/
├── src/
│   ├── config/
│   │   └── prisma.ts          # Prisma client configuration
│   ├── controllers/
│   │   └── bookController.ts  # Request handlers
│   ├── services/
│   │   └── bookService.ts     # Business logic
│   ├── routes/
│   │   └── bookRoutes.ts      # Route definitions
│   ├── middleware/
│   │   ├── errorHandler.ts    # Error handling
│   │   └── validateRequest.ts # Request validation
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── utils/
│   │   └── csvParser.ts       # CSV parsing utility
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── tests/
│   └── book.test.ts           # Unit tests
├── prisma/
│   └── schema.prisma          # Database schema
└── package.json
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | - |
| PORT | Server port | 3000 |
| NODE_ENV | Environment (development/production) | development |

## 📝 Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Book Title",
    "author": "Author Name",
    "publishedYear": 2026,
    "createdAt": "2026-01-11T10:00:00.000Z",
    "updatedAt": "2026-01-11T10:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Import Response:**
```json
{
  "success": true,
  "message": "Import completed",
  "data": {
    "imported": 5,
    "failed": 2,
    "errors": [
      {
        "row": 3,
        "data": {...},
        "errors": ["Title is required .."]
      }
    ]
  }
}
```

## 🚀 Deployment

**Build for production:**
```bash
npm run dev
```

**Start production server:**
```bash
npm start
```


## 👤 Author

Nihar Ranjan Biswal     - [GitHub Profile](https://github.com/ranjanniharbiswal)

##