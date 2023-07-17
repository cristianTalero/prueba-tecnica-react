import axios from 'axios'

/** Axios client for provider */
export const client = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
