import { ICompany } from '@/interfaces'
import request from './request'

const company = {
  getCompany: (userId: string) => request.get<ICompany>(`/company/${userId}`),

  createCompany: (companyData: ICompany, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return request.post<ICompany>(
      `/company?name=${companyData.name}&overview=${companyData.overview}&contacts=${companyData.contacts}`,
      formData
    )
  },

  updateCompany: (companyId: string, companyData: ICompany, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return request.patch<ICompany>(
      `/company/${companyId}?name=${companyData.name}&overview=${companyData.overview}&contacts=${companyData.contacts}`,
      formData
    )
  },
}

export default company
