import axios from 'axios';
// ВИПРАВЛЕНО: додано слово 'type'
import type { Note } from '../types/note';

// ВИПРАВЛЕНО: правильна адреса бекенду
const API_URL = 'https://notehub-public.goit.study/api/notes';

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalNotes: number;
  totalPages: number;
  page: number;
  perPage: number;
}

const api = axios.create({
  baseURL: API_URL,
});

// Функція для отримання заголовків (токен береться з .env)
const getHeaders = () => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error('VITE_NOTEHUB_TOKEN is missing');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('', {
    params,
    headers: getHeaders(),
  });
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const { data } = await api.post<Note>('', note, {
    headers: getHeaders(),
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/${id}`, {
    headers: getHeaders(),
  });
  return data;
};