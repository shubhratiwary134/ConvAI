import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import { HomePage } from './components/HomePage';
import useStore from './storage/store';
import { CheckVerification } from './services/CheckVerification';
import ServerDownPopup from './components/ServerDownPopUp';
import DebateRoom from './components/DebateRoom';
import AdminPanel from './components/AdminPanel';
import { AdminChoice } from './components/AdminChoice';
import AdminDashboard from './components/AdminDashboard';
import CharacterForm from './components/CharacterForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const serverDown = useStore((state)=>state.serverDown)
  const setServerDown=useStore((state)=>state.setServerDown)
  const setTokenVerified = useStore((state)=>state.setTokenVerified)
  const setUsername = useStore((state)=>state.setUsername)
  useEffect(()=>{
    async function Verification(){
      const response = await CheckVerification()
      setTokenVerified(response.tokenBoolean)
      setUsername(response.username)
    }
    Verification()
  },[setTokenVerified,setUsername])
  return (
    <>
     <BrowserRouter >
     <ServerDownPopup isVisible={serverDown} onclose={()=>setServerDown(false)} />
    <Routes>
    
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
      
          {/* Protected Routes */}
      <Route path='/debateRoom' element={<ProtectedRoute element={<DebateRoom></DebateRoom>}></ProtectedRoute>}></Route>
      <Route path='/adminPanel' element={<ProtectedRoute element={<AdminPanel></AdminPanel>}></ProtectedRoute>}></Route>
      <Route path='/choice' element={<ProtectedRoute element={<AdminChoice></AdminChoice>}></ProtectedRoute>}></Route>
      <Route path='/AdminDashboard' element={<ProtectedRoute element={<AdminDashboard></AdminDashboard>}></ProtectedRoute>}></Route>
      <Route path='/choice/form' element={<ProtectedRoute element={<CharacterForm></CharacterForm>}></ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;