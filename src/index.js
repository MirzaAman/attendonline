// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.js';
// import ProfilePage from './Pages/Profile.jsx'
// import Login from './Pages/Login.jsx'
// import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
// import Class from './Pages/Class.jsx'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route element={<App />} path='/' />
//         <Route element={<ProfilePage />} path='/en/auth/user/profile' />
//         <Route element={<Login/>} path='/en/accounts/login' />
//         <Route element={<Class/>} path='/en/auth/class/:classNamee' />
//         <Route element={<Class/>} path='/en/auth/class/:classNamee' />
//       </Routes>
//       {/* /en/auth/class/ */}
//     </Router>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import App from './App';
import Class from './Pages/Class';
import Login from './Pages/Login';
import ProfilePage from './Pages/Profile';
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
