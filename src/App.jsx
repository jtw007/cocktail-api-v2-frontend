import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//components import
import Navbar from './components/NavBar'
import Home from './components/pages/Home'

function App() {
  //currently logged in user will be stored here in state
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <Router>
      <header>
        <Navbar />
      </header>

      <div className='App'>
        <Routes>
          <Route 
            path='/'
            element={<Home />}
          />
        </Routes>
      </div>

    </Router>
  )
}

export default App
