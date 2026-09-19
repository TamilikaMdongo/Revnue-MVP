import './App.css'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Transaction from './pages/Transaction'
import Invoice from './pages/Invoice'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Login from './components/Login'

1
function App() {
  return (
   <BrowserRouter>
   
    <Routes>
      <Route path='/home' element = {<Home/>}/>
      <Route path='/transaction' element = {<Transaction/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/' element = {<Login/>}/>
      <Route path='/invoice' element = {<Invoice/>}/>
      <Route path='/settings' element = {<Settings/>}/>
      <Route path='/profile' element = {<Profile/>}/>
    </Routes>

   </BrowserRouter>
  )
}

export default App
// <!--<Home/> -->
// <Transaction/>
