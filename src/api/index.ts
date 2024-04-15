import agents from './agents'
import auth from './auth'
import bookmarks from './bookmarks'
import chats from './chats'
import docs from './docs'
import integrations from './integrations'
import users from './users'
import query from './query'
import company from './company'
import chatLogs from './chatLogs'
import webwidget from './webwidget'
import cors from './cors'

const api = {
  auth,
  chats,
  agents,
  cors,
  users,
  docs,
  integrations,
  bookmarks,
  query,
  company,
  chatLogs,
  webwidget,
}

export default api
