import React, { useState } from 'react'
import { UserAuth } from '../components/Context/AuthContext'
import { RiHomeFill } from "react-icons/ri";
import { IoIosFitness } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Exercise } from '../components/Exercise/Exercise';
import { Meal } from '../components/Meal/Meal';
import {FavoriteFood} from '../components/FavoriteFood/FavoriteFood'
import { Setting } from '../components/Setting/Setting';
import { UserMetrics } from '../components/UserMetrics/UserMetrics';
export const AccountPage = () => {
    const {user} = UserAuth()
    const [userName,setUserName] = useState(user.UserName)
    const [active,setActive] = useState(0)
  return (
    <div className='flex relative h-full'>
      <div className='w-[400px] h-full'>
      <div className='w-full pt-6 p-4' >
      <div className='flex flex-col items-center'>
        <div className='w-[80px] h-[80px] rounded-full bg-gray-300 shadow-lg'>
        </div>
        <p className='mt-2 text-center text-[20px] font-medium' >{userName}</p>
      </div>
      <div className='flex justify-center my-4'>
        <div className='h-[1px] w-4/5 bg-black' ></div>
      </div>

      <div>
        <ul>
          <li className='flex items-center text-gray-500  hover:text-green-500 h-10 cursor-pointer' onClick={() => setActive(0)} >
            <RiHomeFill />
            <span className='ml-4'>
              Dashboard
            </span>
          </li>
          <li className='flex items-center text-gray-500 hover:text-green-500 h-10 cursor-pointer' onClick={() => setActive(1)}>
            <IoIosFitness/>
            <span className='ml-4'>
              Exercises
            </span>
            </li>
          <li className='flex items-center text-gray-500 hover:text-green-500 h-10 cursor-pointer' onClick={() => setActive(2)}>
            <GiMeal></GiMeal>
            <span className='ml-4'>  
              Meals
            </span>
            </li>
          <li className='flex items-center text-gray-500 hover:text-green-500 h-10' onClick={() => setActive(3)}>
            <MdFavorite/>
            <span className='ml-4'>
            Favorite food
            </span>
          </li>
          <li className='flex items-center text-gray-500 hover:text-green-500 h-10' onClick={() => setActive(5)}>
            <MdFavorite/>
            <span className='ml-4'>
            User Metrics 
            </span>
          </li>
          <li className='flex items-center text-gray-500 hover:text-green-500 h-10' onClick={() => setActive(4)}>
            <IoMdSettings />
            <span className='ml-4'>
            Setting
            </span>
          </li>
        </ul>
      </div>
    </div>
      </div>
      <div className='p-6 w-full' >
        {active === 0 && 
          <Dashboard/>
        }
        {active === 1 && 
          <Exercise/>
        }
        {active === 2 && 
          <Meal/>
        }
        {active === 3 && 
          <FavoriteFood/>
        }
        {active === 4 && 
          <Setting/>
        }
        {active === 5 && 
          <UserMetrics/>
        }
      </div>
    </div>
  )
}

