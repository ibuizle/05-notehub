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
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  });

  return (
    <ul className={s.list}>
      {notes.map((note) => (
        <li key={note.id} className={s.listItem}>
           {/* Заголовок */}
           <h3 className={s.title}>{note.title}</h3>
           
           {/* Текст нотатки */}
           <p className={s.content}>{note.content}</p>
           
           {/* Нижній блок з тегом та кнопкою */}
           <div className={s.footer}>
             <span className={s.tag}>{note.tag}</span>
             
             <button 
               className={s.button}
               onClick={() => mutate(note.id)} 
               disabled={isPending}
               type="button"
             >
               {isPending ? '...' : 'Delete'}
             </button>
           </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;