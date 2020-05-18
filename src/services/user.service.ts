import axios from 'axios';

const API_URL = 'https://randomuser.me/api';

export function getUsers(results = 10): Promise<any> {
  return axios.get(`${API_URL}?results=${results}&inc=name,location,email,login,picture`);
}
