import { Router } from 'express';
import multer from 'multer';
import { BookController } from '../controllers/bookController';
import { validateCreateBook, validateUpdateBook } from '../middleware/validateRequest';

const router = Router();
const controller = new BookController();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', validateCreateBook, controller.createBook);
router.put('/:id', validateUpdateBook, controller.updateBook);
router.delete('/:id', controller.deleteBook);
router.post('/import', upload.single('file'), controller.importBooks);

export default router;