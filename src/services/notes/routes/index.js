import { Router } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
} from '../controller/note-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { notePayloadSchema, noteUpdatePayloadSchema } from '../../../services/notes/validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
const router = Router();

router.use(authenticateToken); // Remove this to avoid global interception when mounted at /

router.post('/', validate(notePayloadSchema), createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/:id', deleteNoteById);

export default router;