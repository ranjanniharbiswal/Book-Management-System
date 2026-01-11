import { Request, Response, NextFunction } from 'express';
import { CreateBookDto, UpdateBookDto } from '../types';

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, publishedYear }: CreateBookDto = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required and must be a string ..');
  }

  if (!author || typeof author !== 'string' || author.trim() === '') {
    errors.push('Author is required and must be a string ..');
  }

  if (publishedYear === undefined || typeof publishedYear !== 'number') {
    errors.push('Published year is required and must be a number ..');
  } else if (publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
    errors.push(`Published year must be between 1000 and ${new Date().getFullYear()} ..`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

export const validateUpdateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, publishedYear }: UpdateBookDto = req.body;
  const errors: string[] = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('Title must be a non-empty string ..');
  }

  if (author !== undefined && (typeof author !== 'string' || author.trim() === '')) {
    errors.push('Author must be a non-empty string ..');
  }

  if (publishedYear !== undefined) {
    if (typeof publishedYear !== 'number') {
      errors.push('Published year must be a number ..');
    } else if (publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
      errors.push(`Published year must be between 1000 and ${new Date().getFullYear()} ..`);
    }
  }

  if (Object.keys(req.body).length === 0) {
    errors.push('At least one field must be provided for update ..');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};