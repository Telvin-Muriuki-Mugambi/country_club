import { useState } from 'react'
import Dashboard from '../pages/Dashboard'
import Signin from '../pages/Signin'
import { clearAdminSession, createAdminSession, getAdminSession } from '../utils/sessions'
import './App.css'

function App() {
  const [session, setSession] = useState(getAdminSession)

  const signIn = ({ email, password }) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@countryclub.local'
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'clubadmin123'

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return false
    }

    setSession(createAdminSession(email))
    return true
  }

  const signOut = () => {
    clearAdminSession()
    setSession(null)
  }

  return (
    session
      ? <Dashboard onSignOut={signOut} />
      : <Signin onSignIn={signIn} />
  )
}

export default App
