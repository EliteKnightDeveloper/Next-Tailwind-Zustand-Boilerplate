import { MultiSelectOption } from '../elements/MultiSelect'
import { IOption } from '../elements/Select'

export const appLinks = {
  dashboard: '/dashboard',
  agents: '/agents',
  chat: '/chat',
  edit: '/agents/edit',
  create: '/agents/create',
  workflows: '/workflows',
  bookmarks: '/bookmarks',
  company: '/company',
  setting: '/setting',
  converations: '/conversations/all',
  signup: '/signup',
}

export const DEMO_CHAT = 'demo##chats'

export enum ROLE {
  ADMIN = 'admin',
  OWNER = 'owner',
  MANAGER = 'manager',
  VIEWER = 'viewer',
}

export const Roles: IOption[] = [
  {
    id: 0,
    label: 'Director',
  },
  {
    id: 1,
    label: 'Employee',
  },
]

export const Langs: MultiSelectOption[] = [
  {
    value: '0',
    label: 'Malay',
  },
  {
    value: 'Mandarin',
    label: 'Mandarin',
  },
  {
    value: 'English',
    label: 'English',
  },
]

export const Channels: MultiSelectOption[] = [
  {
    value: '0',
    label: 'Web Widget',
  },
  {
    value: '1',
    label: 'Email',
  },
  {
    value: '2',
    label: 'Whatsapp',
  },
]

export const Agents: MultiSelectOption[] = [
  {
    value: 'Farah',
    label: 'Farah',
  },
  {
    value: 'Maya',
    label: 'Maya',
  },
  {
    value: 'Rachel',
    label: 'Rachel',
  },
]

export const Models: IOption[] = [
  {
    id: 0,
    label: 'Claude 2',
  },
  {
    id: 1,
    label: 'Llama 2',
  },
  {
    id: 2,
    label: 'Bard',
  },
  {
    id: 3,
    label: 'GPT-4',
  },
  {
    id: 4,
    label: 'GPT-3.5',
  },
]

export const Times: IOption[] = [
  { id: 0, label: '1 Day' },
  { id: 1, label: '1 Week' },
  { id: 2, label: '1 Month' },
]

export const ImageUrl = process.env.NEXT_PUBLIC_ASSET_URL

export const HUMAN_AVATARS = [
  `${ImageUrl}/image.png`,
  `${ImageUrl}/image (1).png`,
  `${ImageUrl}/image (2).png`,
  `${ImageUrl}/image (3).png`,
]
