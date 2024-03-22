
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from "./Pages/Login"
import HomePage from './Pages/HomePage'
// import HOME from './Pages/HOME.JSX'

function App() {

  return (
    <>
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
    </>
  )
}

export default App
