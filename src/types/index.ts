export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParsedCSVRow {
  title: string;
  author: string;
  publishedYear: string;
}


export interface CreateBookDto {
  title: string;
  author: string;
  publishedYear: number;
}


export interface UpdateBookDto {
  title?: string;
  author?: string;
  publishedYear?: number;
}

export interface ImportResult {
  success: number;
  errors: Array<{
    row: number;
    data: any;
    errors: string[];
  }>;
}

export interface ValidationError {
  field: string;
  message: string;
}