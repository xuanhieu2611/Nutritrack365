import React, { useState } from 'react'
import LogoImg from '../../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../firebase/firebase"
import axios from 'axios'
import { UserAuth } from '../Context/AuthContext'
import { IoIosClose } from "react-icons/io";
export const SignupForm = () => {
  const [UID,setUID] = useState('')
  const {user,setUser} = UserAuth()
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // try {
    //   await createUserWithEmailAndPassword(auth,email,password)
    //   navigate("/profile-setup")
    // } catch (error){
    //   console.log(error.message)
    //   setError(error.message)
    // }

    console.log(UID)

    axios.get(`http://localhost:4000/api/users/${UID}`)
      .then(response => {
        console.log(response.data)
        if (response.data.length === 0){
          setUser({
            ...user,
            UID: UID
          })
          navigate("/profile-setup")
        } else if (response.data.length > 0) {
          console.log("UID already exists")
          setError("UID already exists")
        } 
      }).catch(error => {
        setError(error)
    })
  }

  return (
    <div className='bg-white min-[500px]:bg-gray-100 min-[800px]:bg-white min-[900px]:bg-gray-100 h-[100vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 min-[800px]:grid-cols-2 h-[480px] min-[800px]:h-[400px] w-full min-[500px]:w-[400px] min-[800px]:w-[600px] min-[900px]:w-[840px] bg-white px-6 py-10 rounded-3xl '>
      <Link to={"/"} className='col-span-1 min-[800px]:col-span-2 block w-[60px] h-[60px]'>
        <img src={LogoImg} className='w-full rounded-full'  alt="" />
      </Link>
      <div className='col-span-1'>
        <h1 className='text-2xl font-semibold'>Sign up</h1>
        <p>to continue to our app</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='col-span-1 flex flex-col justify-between'>
        <div className=''>
          <label htmlFor="login-email">UserID</label>
          <div className=' bg-gray-300 h-[48px] w-full rounded-3xl flex items-center px-4'>
            <input type="text" className='bg-transparent w-full h focus:outline-none' onChange={(e) => setUID(e.target.value)} />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button type='submit' className='w-[100px] h-[40px] text-white bg-green-500 rounded-3xl'>Sign up</button>
        </div>
      </form>
      </div>
      {(error != "") && (
        <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center'>
        <div className='w-[300px] h-[100px] bg-white relative rounded-3xl shadow-lg'>
            <div className='absolute right-0 top-1'>
                <IoIosClose size={30} onClick={() => setError("")} />
            </div>
            <div className='h-full flex justify-center items-center'>
                <span>{error}</span>
            </div>
        </div>
        </div>
      )}
    </div>
  )
}

