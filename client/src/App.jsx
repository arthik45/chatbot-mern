import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import Home from './pages/Home'
import Login from './pages/Login'
 import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerify />} />
      </Routes>
    </div>
  )
}

export default App