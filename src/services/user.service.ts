import axios from 'axios';

import { User } from '../context/UserContext';

export function getUsers(): Promise<{ data: User[] }> {
  return axios.get(`/results`);
}
