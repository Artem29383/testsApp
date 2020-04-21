import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const auth = () => axios.get(`${baseURL}/auth`);

export const getTests = () => axios.get(`${baseURL}/tests`);

export const getTestData = id => axios.get(`${baseURL}/tests/${id}`);

export const getTestApi = id => axios.get(`${baseURL}/tests/${id}`);

export const deployingTest = data => axios.post(`${baseURL}/tests`, data);

export const deployingTestName = data =>
  axios.post(`${baseURL}/testsNames`, data);

export const updateThisTest = ({ id, testName, entities, ids, created }) => {
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

export const updateFieldNameTest = data =>
  axios.put(`${baseURL}/testsNames/${data.id}`, data);

export const deleteThisFilm = id => axios.delete(`${baseURL}/tests/${id}`);

export const deleteFieldNameTest = id =>
  axios.delete(`${baseURL}/testsNames/${id}`);
