import axios from 'axios';
import { Note } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN; 

const API_URL = 'https://notehub-public.goit.study/api';

axios.defaults.baseURL = API_URL;

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error('API Token not found inside .env file!');
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export type CreateNoteParams = Pick<Note, 'title' | 'content' | 'tag'>;

export const fetchNotes = async ({ page, perPage, search = '' }: FetchNotesParams): Promise<FetchNotesResponse> => {
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