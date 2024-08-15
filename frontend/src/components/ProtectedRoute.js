import React from 'react'
import useStore from '../storage/store'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({element}) => {
    const {tokenVerified}=useStore()
    if(!tokenVerified){
            return <Navigate to='/login' replace/>
    }
  return (
   element
  )
}

export default ProtectedRoute