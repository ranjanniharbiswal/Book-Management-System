import prisma from '../config/prisma';
import { CreateBookDto, UpdateBookDto, ImportResult } from '../types';
import { CSVParser } from '../utils/csvParser';

export class BookService {
  async getAllBooks() {
    return await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }



  async getBookById(id: string) {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error('Book not found ..');
    }

    return book;
  }



  async createBook(data: CreateBookDto) {
    return await prisma.book.create({
      data,
    });
  }



  async updateBook(id: string, data: UpdateBookDto) {
    await this.getBookById(id);
    return await prisma.book.update({
      where: { id },
      data,
    });
  }



  async deleteBook(id: string) {
    await this.getBookById(id);




    await prisma.book.delete({
      where: { id },
    });
  }

  async importBooks(fileContent: string): Promise<ImportResult> {
    const result: ImportResult = {
      success: 0,
      errors: [],
    };

    try {
      const rows = CSVParser.parse(fileContent);




      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const validation = CSVParser.validate(row);

        if (!validation.isValid) {
          result.errors.push({
            row: i + 2,
            data: row,
            errors: validation.errors,
          });
          continue;
        }



        try {
          const bookData = CSVParser.toBookDto(row);
          await this.createBook(bookData);
          result.success++;
        } catch (error) {
          result.errors.push({
            row: i + 2,
            data: row,
            errors: ['Failed to create book: ' + (error as Error).message],
          });
        }
      }
    } catch (error) {
      throw new Error('Failed to parse CSV: ' + (error as Error).message);
    }

    return result;
  }
}