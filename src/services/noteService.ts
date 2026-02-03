import axios from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';

axios.defaults.baseURL = API_URL;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

// 3. Тип для створення нотатки (щоб не відправити id або дату)
export type CreateNoteParams = Pick<Note, 'title' | 'content' | 'tag'>;

export const fetchNotes = async ({ page, perPage, search = '' }: FetchNotesParams): Promise<FetchNotesResponse> => {
  // Додаємо /notes саме тут
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`/notes/${id}`);
};