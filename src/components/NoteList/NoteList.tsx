// ВИПРАВЛЕНО: Додано імпорт React та type для Note
import React from 'react';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeletingId: string | null;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, isDeletingId }) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <div className={css.contentWrapper}>
             <p className={css.content}>{note.content}</p>
          </div>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => onDelete(note.id)}
              disabled={isDeletingId === note.id}
            >
              {isDeletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;