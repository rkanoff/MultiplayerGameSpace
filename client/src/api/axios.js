import axios from 'axios'
const URL = 'http://localhost:3000'

export default axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' }
})

export const axiosPrivate = axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})