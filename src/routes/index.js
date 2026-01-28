import express from 'express';
import {
  addNote,
  getAllNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
} from '../services/notes/controller/note-controller.js';
import validate, { validateQuery } from '../middlewares/validate.js';
import queryValidator from '../middlewares/query-validator.js';
import {
  notePayloadSchema,
  noteUpdatePayloadSchema,
  noteQuerySchema,
} from '../services/notes/validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), addNote);
router.get('/notes', queryValidator, validateQuery(noteQuerySchema), getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;