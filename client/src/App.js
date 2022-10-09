import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Hotel from './pages/hotel/Hotel'
import List from './pages/List/List'
import { SearchContextProvider } from './context/SearchContext'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/login/Login'
import LoginPage from './pages/login/LoginPage'
import Signup from './pages/SignUp/SignUp'
import LoginSignup from './pages/Login-Signup/index'

const App = () => {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/list' element={<List/>}/>
            <Route path='/hotel/:id' element={<Hotel/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/LoginSignup' element={<LoginSignup/>}/>
            {/* <Route path='/Signup' element={<Signup/>}/> */}
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </AuthContextProvider>
  )
}

export default App