import React from 'react'
import {Routes,Route,Navigate} from "react-router-dom"
import Home from './pages/Home/home'
import SignUp from './pages/Signup/SignUp'
import SignIn from './pages/SignIn/signIn'

function App() {
  return (
    <>
        <Routes>
            <Route path="Home" element={<Home/>}/>
            <Route path="SignUp" element={<SignUp/>}/>
            <Route path="SignIn" element={<SignIn/>}/>
        </Routes>
    </>
  )
}

export default App
