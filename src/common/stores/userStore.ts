import { IUser } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStoreInterface {
  user: IUser | null
  setUser: (user: IUser | null) => void
  editAgent: string | null
  setEditAgent: (editAgent: string | null) => void
  loginTime: string | null
  setLoginTime: (loginTime: string | null) => void
  tenant: string
  setTenant: (tenant: string) => void
}

const userStore = (set: any) => ({
  user: null,
  setUser: (user: IUser | null) => {
    set({ user })
  },
  editAgent: null,
  setEditAgent: (editAgent: string | string) => {
    set({ editAgent })
  },
  loginTime: null,
  setLoginTime: (loginTime: string | string) => {
    set({ loginTime })
  },
  tenant: '',
  setTenant: (tenant: string) => set({ tenant }),
})

const persistedCreditStore: any = persist(userStore, { name: 'USER' })
export const useUserStore = create<UserStoreInterface>(persistedCreditStore)
