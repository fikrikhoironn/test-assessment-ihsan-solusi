import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cms-admin-v2.ihsansolusi.co.id',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  },
});

export default instance;