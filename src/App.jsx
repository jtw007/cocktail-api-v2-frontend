import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'


//components import
import Navbar from './components/NavBar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Favorites from './components/pages/Favorites'

function App() {
  //currently logged in user will be stored here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away from the page, we will log them back in
  useEffect(() => { 
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <div className='App'>

        <Navbar currentUser={currentUser} handleLogout={handleLogout}/>

        <Routes>
          <Route 
            path='/'
            element={<Home currentUser={currentUser} />}
          />

          <Route 
            path='/login'
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path='/profile'
            element={<Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path='/register'
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path='/favorites'
            element={<Favorites currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

        </Routes>
      </div>

    </Router>
  )
}

export default App
