import axios from 'axios';

const server = axios.create({
  baseURL: ' http://localhost:9000',
  timeout: 3000,
});

export default server;
// ESLint didnt like me importing and using this without the this keyword in a class Method.
