import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/landingPage'
import LobbyPage from './components/lobby'
import RegisterUserPage from './components/registerUserPage'
import RequireAuth from './components/requireAuth'
import PersistUser from './components/persistUser'
import PublicRedirect from './components/publicRedirect'
import ErrorPage from './components/errorPage'
import CreateGamePage from './components/createGamePage'

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
          <Route path='/lobby' element={ <LobbyPage />} />
          <Route path='/createGame' element={ <CreateGamePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
