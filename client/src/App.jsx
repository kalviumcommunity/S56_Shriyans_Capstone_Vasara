
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from "./Pages/Login"
import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup'
import Styles from './Pages/StylesPage'
import Profile from './Pages/Profile'
import UpdateUserData from './Components/UpdateUserData'
import ColorsPage from './Pages/ColorsPage'
import Contact from './Pages/Contact'
import ColorDetails from './Pages/ColorDetails'
import AdminPanel from './Adminpanel/AdminPanel'
import Users from './Adminpanel/Users'
import Colors from './Adminpanel/Colors'
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
  <Route path='/updateProfile/:id' element={<UpdateUserData/>}/>
  <Route path="/Colors" element={<ColorsPage/>}/>
  <Route path='/contact_us' element={<Contact/>}/>
  <Route path='/colordetails/:id' element={<ColorDetails/>}/>
  <Route path='/admin' element={<AdminPanel/>}/>
  <Route path='/admin/users' element={<Users/>}/>
  <Route path='/admin/colors' element={<Colors/>}/>
</Routes>
    </>
  )
}

export default App
