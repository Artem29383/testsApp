import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const auth = () => {
  return axios.get(`${baseURL}/auth`);
};

export const getTests = () => {
  return axios.get(`${baseURL}/tests`);
};

export const getTestData = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};

export const getTestApi = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};

export const deployingTest = data => {
  return axios.post(`${baseURL}/tests`, data);
};

export const deployingTestName = data => {
  return axios.post(`${baseURL}/testsNames`, data);
};

export const updateThisTest = data => {
  const { id, testName, entities, ids, created } = data;
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

export const updateFieldNameTest = data => {
  return axios.put(`${baseURL}/testsNames/${data.id}`, data);
};

export const deleteThisFilm = id => {
  return axios.delete(`${baseURL}/tests/${id}`);
};

export const deleteFieldNameTest = id => {
  return axios.delete(`${baseURL}/testsNames/${id}`);
};
