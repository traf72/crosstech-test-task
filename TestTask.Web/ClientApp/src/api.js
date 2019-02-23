import axios from 'axios';

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
    return axios.delete(`api/employees`, id);
}

export const getPositions = () => {
    return axios.get(`api/positions`);
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
