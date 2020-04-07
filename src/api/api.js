import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const auth = () => {
  return axios.get(`${baseURL}/auth`);
};

export const getTests = () => {
  return axios.get(`${baseURL}/tests`);
};

export const getTestApi = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};
