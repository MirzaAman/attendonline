<!-- import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import App from './App';
import Class from './Pages/Class';
import Login from './Pages/Login';
import ProfilePage from './Pages/Profile.';
import Confirm from './Pages/Confirm';
import Chart from './Pages/Chart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} path='/' />
        <Route element={<Class />} path='/en/auth/class/:classNamee'/>
        <Route element={<Login/>} path='/en/accounts/login' />
        <Route element={<ProfilePage/>} path='/en/auth/user/profile'/>
        <Route element={<Confirm/>} path='/en/auth/class/confirm'/>
        <Route element={<Chart/>} path='/en/auth/class/:classNamee/char'/>
      </Routes>
    </Router>
  </React.StrictMode>
);



import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Main from './components/Main'



function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null)

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user != null) {
        setUser(true)
      } else {
        navigate('/en/accounts/login')
      }
    })
  }, [])

  return (
    <>
      <NavBar />
      <Main />
      <Footer />
    </>
  )
}

export default App -->