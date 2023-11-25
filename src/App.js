// import React, { useEffect, useState } from 'react'
// import NavBar from './components/NavBar'
// import Main from './components/Main'
// import Footer from './components/Footer'
// import { onAuthStateChanged } from 'firebase/auth'
// import { getAuth } from 'firebase/auth';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// function App() {

//     const navigate = useNavigate();
//     const [use,setUser]=useState(null);

//     useEffect(() => {
//         getAuth().onAuthStateChanged((user) => {
//             if (user != null) {
//                 setUser(true)
//             } else {
//                 navigate('/en/accounts/login')
//                 setUser(false)
//             }
//         })
//     })

//     return (
//         <>
//             <NavBar />
//             <Main />
//             <Footer/>
//         </>
//     )
// }

// export default App
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

export default App