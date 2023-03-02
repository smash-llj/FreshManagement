import axios from '@/request/request'

export const denglu = '/api/system/denglu'
export const register = "/api/system/register"
export const userlist = "/api/system/userlist"
export const deleteuser = "/api/system/deleteuser"
export const updaterole = "/api/system/updateRole"

export const apartment = "/api/system/apartment"

export const search = "/api/system/systemSearch"

export const systemAdd = "/api/system/systemAdd"

export const updateSystem = "/api/system/updateSystem"

export const delSystem = "/api/system/delSystem"

function Delsystem(params) {
    return axios.get(delSystem, { params })
}


function Search(params) {
    return axios.get(search, { params })
}

function UpdateSystem(params) {
    return axios.get(updateSystem, { params })
}


function AddSystem(params) {
    return axios.get(systemAdd, { params })
}

function dengLu(params) {
    return axios.get(denglu, { params })
}

function Register(params) {
    return axios.get(register, { params })
}
function UserList(params) {
    return axios.get(userlist, { params })
}
function DeleteUser(params) {
    return axios.get(deleteuser, { params })
}
function updateRole(params) {
    return axios.get(updaterole, { params })
}

function Apartment(params) {
    return axios.get(apartment, { params })
}
export {
    dengLu,
    Register,
    UserList,
    DeleteUser,
    updateRole,
    Apartment,
    Search,
    AddSystem,
    UpdateSystem,
    Delsystem
}