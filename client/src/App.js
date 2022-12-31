import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/landingPage'
import LobbyPage from './components/lobby'
import RegisterUserPage from './components/registerUserPage'
import RequireAuth from './components/requireAuth'
import PersistUser from './components/persistUser'

function App() {
  return (
    <>
    <Routes> 
      <Route path='/' element={ <LandingPage />} />
      <Route path='/register' element={< RegisterUserPage />} />
      <Route element={ <PersistUser /> }>
        <Route element={ <RequireAuth /> }>
          <Route path='/lobby' element={ <LobbyPage />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App
