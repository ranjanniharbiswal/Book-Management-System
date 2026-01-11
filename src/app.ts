import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Book Management API',
    version: '1.0.0',
    endpoints: {
      books: '/books',
      import: '/books/import',
    },
  });
});

app.use('/books', bookRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;