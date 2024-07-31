import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Homepage} from './pages/Homepage'
import {LoginPage} from './pages/LoginPage'
import {SignupPage} from './pages/SignupPage'
import {ProfileSetupPage} from './pages/ProfileSetupPage'
import {AccountPage} from './pages/AccountPage'
import { AuthContextProvider } from './components/Context/AuthContext';
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage></Homepage>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/profile-setup' element={<ProfileSetupPage/>}></Route>
          <Route path='/account' element={<AccountPage/>}></Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App
