import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/bookService';
import { CreateBookDto, UpdateBookDto } from '../types';

const bookService = new BookService();


//Get All Books
export class BookController {
  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getAllBooks();
      res.json({
        success: true,
        message:"All books fetched successfully ..",
        count: books.length,
        data: books,
      });
    } catch (error: any) {
      res.json({
        success:false,
        message:error.message
      });
      next(error);
    }
  }


  //Get Book Details By Id
  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id as string);
      res.json({
        success: true,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }


  //Create Book
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookData: CreateBookDto = req.body;
      const book = await bookService.createBook(bookData);
      res.status(201).json({
        success: true,
        data: book,
      });
    } catch (error: any) {
      res.json({
        success:false,
        message:error.message
      })
      next(error);
    }
  }


  //Update Book
  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const bookData: UpdateBookDto = req.body;
      const book = await bookService.updateBook(id as string, bookData);
      res.json({
        success: true,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }


  //Delete Book
  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await bookService.deleteBook(id as string);
      res.json({
        success: true,
        message: 'Book deleted successfully ..',
      });
    } catch (error) {
      next(error);
    }
  }


  //Import Book(format : .csv)
  async importBooks(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded ..',
        });
      }

      const fileContent = req.file.buffer.toString('utf-8');
      const result = await bookService.importBooks(fileContent);

      res.status(200).json({
        success: true,
        message: 'Import completed ..',
        data: {
          imported: result.success,
          failed: result.errors.length,
          errors: result.errors,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}