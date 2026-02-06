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

// router.use(authenticateToken); // Remove this to avoid global interception when mounted at /

router.post('/notes', authenticateToken, validate(notePayloadSchema), createNote);
router.get('/notes', authenticateToken, getNotes);
router.get('/notes/:id', authenticateToken, getNoteById);
router.put('/notes/:id', authenticateToken, validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/notes/:id', authenticateToken, deleteNoteById);

export default router;