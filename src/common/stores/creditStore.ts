import { create } from 'zustand'
import { ICredit } from '@/interfaces'
import { persist } from 'zustand/middleware'

interface CreditInterface {
  credit: ICredit
  setCredit: (credit: ICredit) => void
  credits: ICredit[]
  setCredits: (credits: ICredit[]) => void
}

const creditStore = (set: any) => ({
  credit: {
    value: 0,
    date: '',
    datePeriod: '',
    label: '',
    checked: false,
  },
  setCredit: (credit: ICredit) => {
    set({ credit })
  },

  credits: [],
  setCredits: (credits: ICredit[]) => {
    set({ credits })
  },
})

const persistedCreditStore: any = persist(creditStore, { name: 'CREDIT' })
export const useCreditStore = create<CreditInterface>(persistedCreditStore)
