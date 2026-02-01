import { nanoid } from 'nanoid';
import NoteRepositories from '../repositories/note-repositories.js';
import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';


export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validated;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags
  });
 
  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }
 
  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

export const getNotes = async (req, res) => {
  const notes = await NoteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', notes);
}

export const addNote = (req, res, next) => {
  try {
    const { title, tags, body } = req.validated;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    notes.push(newNote);

    return response(res, 201, 'Catatan berhasil ditambahkan', {
      noteId: id,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = (req, res, next) => {
  const { title = '' } = req.query;
    if (title !== '') {
    const note = notes.filter((note) => note.title === title);
    return response(res, 200, 'success', { notes: note });
  }
  try {
    return response(res, 200, 'Catatan berhasil diambil', {
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next (new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan Sukses ditampilkan', note);
};

export const editNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;

  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags
  });
  if (!note) {
    return next(new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui');
}

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await NoteRepositories.deleteNote(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan'));
  }
  return response(res, 200, 'Catatan berhasil dihapus');
}

export const editNoteById = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, tags, body } = req.validated;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return response(res, 200, 'Catatan berhasil diperbarui');
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById = (req, res, next) => {
  try {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    notes.splice(index, 1);

    return response(res, 200, 'Catatan berhasil dihapus');
  } catch (error) {
    next(error);
  }
};