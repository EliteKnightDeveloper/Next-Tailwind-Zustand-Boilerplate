import { create } from 'zustand'
import { IDoc } from '@/interfaces'
import { persist } from 'zustand/middleware'

interface DocInterface {
  docs: IDoc[]
  setDocs: (docs: IDoc[]) => void
}

const docStore = (set: any) => ({
  docs: [],
  setDocs: (docs: IDoc[]) => {
    set({ docs })
  },
})

const persistedDocStore: any = persist(docStore, { name: 'DOC' })
export const useDocStore = create<DocInterface>(persistedDocStore)
