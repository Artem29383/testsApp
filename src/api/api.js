import axios from 'axios';

const baseURL = 'http://localhost:3000';
const baseUrl2 = 'https://snp-tests.herokuapp.com/api/v1/';

export const signInApi = (login, password) =>
  axios.post(
    `${baseUrl2}signin`,
    {
      username: login,
      password,
    },
    {
      withCredentials: true,
    }
  );

export const getUsersCurrentApi = () =>
  axios.get(`${baseUrl2}users/current`, {
    withCredentials: true,
  });

export const logoutUserApi = () =>
  axios.delete(`${baseUrl2}logout`, {
    withCredentials: true,
  });

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

export const getTestForPassingTestApi = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};
