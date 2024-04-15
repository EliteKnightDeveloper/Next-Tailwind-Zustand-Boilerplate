import request from './request'

interface ValidateBack {
  message: string
}

const auth = {
  validate: (token: string) =>
    request.post<ValidateBack>(`/auth/magic/validate/${token}`, {}),
}

export default auth
