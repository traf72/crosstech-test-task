import axios from 'axios';

export const getCatalog = (catalogName, params) => {
    return axios.get(`api/catalog/${catalogName}`, { params });
}

export const getEmployees = () => {
    return axios.get(`api/employees`);
}

export const getEmployee = id => {
    return axios.get(`api/employees/${id}`);
}

export const createEmployee = employee => {
    return axios.post(`api/employees`, employee);
}

export const editEmployee = employee => {
    return axios.put(`api/employees`, employee);
}

export const deleteEmployee = id => {
    return axios.delete(`api/employees`, { params: { id }});
}

export const signIn = credentials => {
    return axios.post(`api/auth`, credentials);
}

export const signOut = () => {
    return axios.delete(`api/auth`);
}

export const getCurrentUser = () => {
    return axios.get(`api/auth`);
}
