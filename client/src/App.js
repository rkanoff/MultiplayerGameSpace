import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/public/landingPage'
import RegisterUserPage from './components/public/registerUserPage'
import ErrorPage from './components/public/errorPage'
import RequireAuth from './components/redirects/requireAuth'
import PersistUser from './components/redirects/persistUser'
import PublicRedirect from './components/redirects/publicRedirect'
import RequireAdmin from './components/redirects/requireAdmin'
import LobbyPage from './components/user/lobby'
import CreateGamePage from './components/user/createGamePage'
import AdminLobbyPage from './components/admin/lobbyAdminView'
import AdminUsersPage from './components/admin/usersAdminView'
import ChatRoom from './components/user/chatRoom'

function App() {
  return (
    <Routes>
       
      <Route path='/*' element={ <ErrorPage />} />
      
      <Route element={ <PersistUser /> }>
        <Route element={ <PublicRedirect /> }>
          <Route path='/' element={ <LandingPage />} />
          <Route path='/register' element={< RegisterUserPage />} />
        </Route>
      </Route>

      <Route element={ <PersistUser /> }>
        <Route element={ <RequireAuth /> }>
          <Route path='/lobby' element={ <LobbyPage /> } />
          <Route path='/createGame' element={ <CreateGamePage /> } />
          <Route path='/chatRoom' element= { <ChatRoom /> } />
            <Route element={ <RequireAdmin /> }>
              <Route path='/adminLobby' element={ <AdminLobbyPage /> } />
              <Route path='/adminUsers' element={ <AdminUsersPage /> } />
            </Route>
        </Route>
      </Route>
      
    </Routes>
  );
}

export default App
