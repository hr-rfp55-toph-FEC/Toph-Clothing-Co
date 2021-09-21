import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 3000,
});

export default server;
