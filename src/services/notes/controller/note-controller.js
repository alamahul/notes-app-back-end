import NoteRepositories from '../repositories/note-repositories.js';
import response from '../../../utils/response.js';
import {
  InvariantError,
  NotFoundError,
  AuthorizationError,
  AuthenticationError
} from '../../../exceptions/index.js';

export const createNote = async (req, res, next) => {
  if (!req.validated) {
    return next(new InvariantError('Payload tidak valid'));
  }
  const { title, body, tags } = req.validated;
  const { id: owner } = req.user;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
    owner
  });
  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }
  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

export const addNote = async (req, res, next) => {
  try {
    if (!req.validated) {
      return next(new InvariantError('Payload tidak valid'));
    }
    const { title, body, tags } = req.validated;
    const note = await NoteRepositories.createNote({ title, body, tags });
    if (!note) {
      return next(new InvariantError('Catatan gagal ditambahkan'));
    }
    return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await NoteRepositories.getNotes(owner);
  return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { title = '' } = req.query;
    const notes = await NoteRepositories.getNotes();

    if (title !== '') {
      const filtered = notes.filter((n) => n.title === title);
      return response(res, 200, 'success', { notes: filtered });
    }

    return response(res, 200, 'Catatan berhasil diambil', { notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
 const { id } = req.params;
 const { id: owner } = req.user;
 
 const isOwner = await NoteRepositories.verifyNoteAccess(id, owner);
 
 if (!isOwner) {
   return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
 }
 
 const note = await NoteRepositories.getNoteById(id);
 
 if (!note) {
   return next(new NotFoundError('Catatan tidak ditemukan'));
 }
 
 return response(res, 200, 'Catatan sukses ditampilkan', {note});
};
 
export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    body,
    tags
  } = req.validated;
  const { id: owner } = req.user;
  const isOwner = await NoteRepositories.verifyNoteAccess(id, owner);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }
  // Pastikan tags tidak null
  const safeTags = tags !== undefined && tags !== null ? tags : [];
  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags: safeTags
  });
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 
 return response(res, 200, 'Catatan berhasil diperbarui', {note});
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const note = await NoteRepositories.getNoteById(id);
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
  if (note.owner !== owner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const deletedNote = await NoteRepositories.deleteNote(id);
  return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};
