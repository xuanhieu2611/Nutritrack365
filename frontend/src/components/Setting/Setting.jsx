import React, { useState } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { signOut } from 'firebase/auth'
import {auth} from "../../firebase/firebase"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const Setting = () => {
  const {user,setUser} = UserAuth()
  const navigate = useNavigate()
  const logout = async (e) => {
    e.preventDefault()

    try {
      setUser({
        UID: null,
        UserName: null,
        Weight: null,
        Height: null
      })
      navigate("/")
    } catch (err){
      alert(err.message)
    }
  }

  const [newUser,setNewUser] = useState({
        UID: user.UID,
        UserName: null,
        Weight: null,
        Height: null,
        GoalId: user.GoalId,
        RecommendID: user.RecommendID
  }) 

  const [edit,setEdit] = useState(false)

  const handleInputChange = (e) => {
    const {name,value} = e.target

    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const handleUserInfo = (e) => {
    e.preventDefault()

    if (newUser === user){
      setEdit(false)
    } else {
      // update endpoint to user
      axios.patch(`http://localhost:4000/api/users?UID=${newUser.UID}&&name=${newUser.UserName}&&weight=${newUser.Weight}&&height=${newUser.Height}`).then((response) => {
          console.log(response.data)
          setUser(newUser)
          setEdit(false)
      }).catch(error => {
        console.log(error)
      })

    }
    
 
  }
  
  return (
    <div>
      <h1 className='font-bold text-[24px]'>Setting</h1>
      {
        !edit && (
      <div className='w-[800px] mb-4'>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >UID</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" value={user.UID} name='UID' disabled className=' bg-transparent w-fit hover:cursor-not-allowed' />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Username</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" value={user.UserName} name='UserName' disabled={!edit} className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Height</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" value={user.Height} disabled={!edit} name='Height' className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Weight</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" value={user.Weight} disabled={!edit} name='Weight' className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
      </div>
        )
      }
      {edit && (
        <div className='w-[800px] mb-4'>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >UID</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" value={user.UID} name='UID' disabled className=' bg-transparent w-fit hover:cursor-not-allowed' />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Username</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" placeholder={user.UserName} name='UserName' onChange={handleInputChange} disabled={!edit} className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Height</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" placeholder={user.Height} disabled={!edit} onChange={handleInputChange} name='Height' className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
        <div className='flex justify-between items-center h-[48px]'>
          <label htmlFor="" className='font-medium' >Weight</label>
          <div className='h-8 bg-gray-300 rounded-3xl px-4 flex justify-center hover:cursor-not-allowed'>
          <input type="text" placeholder={user.Weight} disabled={!edit} onChange={handleInputChange} name='Weight' className={`bg-transparent w-fit outline-none ${!edit ? 'hover:cursor-not-allowed' : ''}`} />
          </div>
        </div>
      </div>
      )}

      {
        !edit && (
          <div className='w-[300px] flex justify-between'>
            <button className=' bg-red-500 w-[100px] h-[48px] rounded-3xl text-white' onClick={(e) => logout(e)}>Log out</button>
            <button className='w-[100px] h-[48px] bg-green-500 rounded-3xl' onClick={() => setEdit(true)} >Edit </button>
          </div>
        )
      }
      {
        edit && (
          <div className='w-[300px] flex justify-between'>
            <button className='w-[100px] h-[48px] bg-gray-400 rounded-3xl' onClick={() => {
              setEdit(false)
            }}>Discard</button>
            <button className='w-[100px] h-[48px] bg-green-500 rounded-3xl' onClick={handleUserInfo} > Save</button>
          </div>
        )
      }
    </div>
  )
}
