import React from 'react'
import { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { UserAuth } from '../Context/AuthContext';
import axios from 'axios';
export const ProfileSetup = () => {
    const {user,setUser} = UserAuth()
    console.log("UID",user.UID)
    const [active,setActive] = useState(0)
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (e) => {
      const {name,value} = e.target

      setUser({
        ...user,
        [name]: value
      })
    }

    const [activePopUp,setActivePopUp] = useState(false)

    const handleUserInput = (e) => {
      e.preventDefault()
      if (user.UserName == '') {
        setActive(0);
        setActivePopUp(true)
        setError(`Please fill in username`);
      } else if (user.Height == '') {
        setActive(1)
        setActivePopUp(true)
        setError(`Please fill in height`)
      } else if (user.Weight == ''){
        setActive(2)
        setActivePopUp(true)
        setError(`Please fill in weight`)
      } else {
        console.log(user)
        setError('');
        const weight = isNaN(parseInt(user.Weight)) ? 0 : parseInt(user.Weight);
        const height = isNaN(parseInt(user.Height)) ? 0 : parseInt(user.Height);
        axios.post(`http://localhost:4000/api/users/?username=${user.UID}&name=${user.UserName}&weight=${weight}&height=${height}`).then(response => {
            console.log(response.data)
            navigate('/account')
        }).catch(error => {
          setError(error)
          console.log(error)
        })
      }
    }
  return (
    <div>
      <div className='bg-white min-[500px]:bg-gray-100 min-[800px]:bg-white min-[900px]:bg-gray-100 h-[100vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 min-[800px]:grid-cols-2 h-[480px] min-[800px]:h-[400px] w-full min-[500px]:w-[400px] min-[800px]:w-[600px] min-[900px]:w-[840px] bg-white px-6 py-10 rounded-3xl '>
      <div className='col-span-1'>
        <h1 className='text-2xl font-semibold'>Complete user information</h1>
        <div className='mt-2 h-4 rounded-lg border overflow-hidden max-w-[300px]'>
          <div className={`bg-green-500 rounded-lg h-full transition-all delay-1`} style={{width: `${active * 100/3}%`}}></div>
        </div>
        <div>
          <h1 className='mt-4'>
            Step {active + 1} out of 3
          </h1>
        </div>
      </div>
      <div className='col-span-1 flex flex-col justify-between'>
        {active=== 0 && <div className=''>
          <label htmlFor="login-email">Username</label>
          <div className='mt-1 bg-gray-300 h-[48px] px-6 py-1 w-full flex items-center rounded-3xl'>
            <input type="text" name='UserName' className='bg-transparent w-full h-[40px] focus:outline-none' onChange={handleInputChange} />
          </div>
        </div>}
        {active === 1 && <div className=''>
          <label htmlFor="login-password">Height (cm)</label>
          <div className='bg-gray-300 h-[48px] px-6 py-1 w-full flex items-center rounded-3xl '>
            <input type="number" name='Height' className='w-full h-[40px] focus:outline-none bg-transparent' onChange={handleInputChange} />
          </div>
        </div>}
        {active === 2 && <div className=''>
          <label htmlFor="login-password">Weight (kg)</label>
          <div className='bg-gray-300 h-[48px] px-6 py-1 w-full flex items-center rounded-3xl'>
            <input type='number' name='Weight' className='pl-4 w-full h-[40px] focus:outline-none bg-transparent' onChange={handleInputChange} />
          </div>
        </div>}
        <div className='flex justify-end gap-4'>
            {active > 0 && <button className='w-[100px] h-[40px] text-green-500 rounded-3xl' onClick={() => {
                if (active > 0){
                    setActive(active - 1)
                }
            }} >Back</button>}
          <button className='w-[100px] h-[40px] text-white bg-green-500 rounded-3xl' onClick={(e) => {
            if (active < 2) setActive(active+1)
            else {
                handleUserInput(e)
          }
          }}>Next</button>
        </div>
      </div>
      </div>
      {
        activePopUp && (
          <div className='z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center'>
              <div className='w-[200px] h-[150px] relative bg-white shadow-xl p-4 rounded-3xl flex items-center'>
                <IoMdClose className='absolute right-2 top-2' onClick={() => setActivePopUp(false)}></IoMdClose>
                <p className='text-center uppercase'>{error}</p>
              </div>
          </div>
        )
      }
    </div>
    </div>
  )
}

