import axios, { AxiosResponse } from 'axios'
import { firebaseAuth } from './firebaseConfig'

const responseBody = <T>(response: AxiosResponse<T>) => response.data

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await firebaseAuth.currentUser?.getIdToken(
    true
  )}`
  return config
})

axios.interceptors.response.use(
  (config) => config,
  (res) => {
    try {
      if (res.response && res.response.status === 401) {
        firebaseAuth.signOut()
      }
    } catch (e) {
      throw e
    }
    throw res
  }
)

export const axiosIntegrations = axios.create()

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),

  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),

  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),

  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),

  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),

  postFormData: <T>(url: string, formData: FormData) =>
    axios
      .post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(responseBody),
}

export const integrationsRequest = {
  get: <T>(url: string) => axiosIntegrations.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axiosIntegrations.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axiosIntegrations.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

export default request
