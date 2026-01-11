import { CreateBookDto } from '../types';
import { ParsedCSVRow } from '../types';


export class CSVParser {
  static parse(fileContent: string): ParsedCSVRow[] {
  const lines = fileContent.trim().split('\n');
  if (lines.length === 0) throw new Error('CSV file is empty');

  const rawHeaders = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows: ParsedCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = this.parseCSVLine(lines[i]);
    const row: any = {};

    rawHeaders.forEach((header, index) => {
      const value = values[index]?.trim() || '';
      
      if (header === 'title') row.title = value;
      if (header === 'author') row.author = value;
      if (header === 'publishedyear') row.publishedYear = value;
    });

    rows.push(row as ParsedCSVRow);
  }
  return rows;
}

  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  static validate(row: ParsedCSVRow): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!row.title || row.title.trim() === '') {
      errors.push('Title is required ..');
    }

    if (!row.author || row.author.trim() === '') {
      errors.push('Author is required ..');
    }

    if (!row.publishedYear || row.publishedYear.trim() === '') {
      errors.push('Published year is required ..');
    } else {
      const year = parseInt(row.publishedYear, 10);
      if (isNaN(year)) {
        errors.push('Published year must be a valid number ..');
      } else if (year < 1000 || year > new Date().getFullYear()) {
        errors.push(`Published year must be between 1000 and ${new Date().getFullYear()} ..`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static toBookDto(row: ParsedCSVRow): CreateBookDto {
    return {
      title: row.title.trim(),
      author: row.author.trim(),
      publishedYear: parseInt(row.publishedYear, 10),
    };
  }
}
