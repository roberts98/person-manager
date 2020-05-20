import axios from 'axios';

import { User } from '../context/UserContext';

export function getUsers(): Promise<{ data: User[] }> {
  return axios(`/api/users`, {
    method: 'GET',
  });
}

export function deleteUser(userId: number) {
  return axios(`/api/users/${userId}`, {
    method: 'DELETE',
  });
}

export function editUser(userId: number, data: Partial<User>) {
  return axios(`/api/users/${userId}`, {
    method: 'PATCH',
    data,
  });
}

export function seedDb() {
  return axios(`/api/seedDb`, {
    method: 'POST',
  });
}
