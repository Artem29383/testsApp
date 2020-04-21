import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const authApi = () => axios.get(`${baseURL}/auth`);

export const getTestsApi = () => axios.get(`${baseURL}/tests`);

export const getTestDataApi = id => axios.get(`${baseURL}/tests/${id}`);

export const getTestApi = id => axios.get(`${baseURL}/tests/${id}`);

export const createTestApi = data => axios.post(`${baseURL}/tests`, data);

export const updateTestApi = ({ id, testName, entities, ids, created }) => {
  const questions = {
    entities,
    ids,
  };
  const test = {
    testName,
    questions,
    id,
    created,
  };
  return axios.put(`${baseURL}/tests/${id}`, test);
};

export const deleteTestApi = id => axios.delete(`${baseURL}/tests/${id}`);
