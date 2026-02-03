import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import { Note } from '../../types/note';
import s from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('Помилка при видаленні:', error);
    }
  });

  return (
    <ul className={s.list}> 
      {notes.map((note) => (
        <li key={note.id} className={s.item}>
          <div className={s.contentWrapper}>
             <h3 className={s.title}>{note.title}</h3>
             <p className={s.content}>{note.content}</p>
             <span className={s.tag}>{note.tag}</span>
          </div>

          <button 
            className={s.deleteBtn}
            onClick={() => mutate(note.id)} 
            disabled={isPending}
            type="button"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;