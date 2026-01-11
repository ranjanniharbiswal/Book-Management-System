import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/prisma';

describe('Book Management', () => {

  afterAll(async () => {
    await prisma.$disconnect();
  });



  let createdBookId: string;

  describe('POST /books', () => {
    it('create a new book', async () => {
      const response = await request(app)
        .post('/books')
        .send({
          title: 'bookTitle',
          author: 'bookAuthor',
          publishedYear: 2023,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe('bookTitle');
      
      createdBookId = response.body.data.id;
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/books')
        .send({
          title: '',
          author: 'Test Author',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /books', () => {
    it('get all books', async () => {
      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /books/:id', () => {
    it('get a specific  book by id', async () => {
      const response = await request(app).get(`/books/${createdBookId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdBookId);
    });
  });

  describe('PUT /books/:id', () => {
    it('update a book', async () => {
      const response = await request(app)
        .put(`/books/${createdBookId}`)
        .send({
          title: 'Updated Book Title',
          publishedYear: 2026,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Book Title');
      expect(response.body.data.publishedYear).toBe(2026);
    });
  });

  describe('DELETE /books/:id', () => {
    it('delete a book', async () => {
      const response = await request(app).delete(`/books/${createdBookId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /books/import', () => {
    it('import books from CSV', async () => {
      const csvContent = `title,author,publishedYear
Book 1,Author 1,2025
Book 2,Author 2,2026`;

      const response = await request(app)
        .post('/books/import')
        .attach('file', Buffer.from(csvContent), 'books.csv');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.imported).toBe(2);
    });
  });
  
});