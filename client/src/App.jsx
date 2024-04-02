
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from "./Pages/Login"
import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup'
import Styles from './Pages/StylesPage'
import Profile from './Pages/Profile'
// import HOME from './Pages/HOME.JSX'

function App() {

  return (
    <>
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/styles' element={<Styles/>}/>
  <Route path='/profile/:id' element={<Profile/>}/>
</Routes>
    </>
  )
}

export default App
