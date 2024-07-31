import React, { useState } from 'react'
import LogoImg from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { UserAuth } from '../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
export const Navbar = () => {
  const [activeMenu,setActiveMenu] = useState(false)
  const {user,setUser} = UserAuth()
  function hasNonNullProperty(obj) {
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            return true; 
        }
    }
    return false; 
}

  return (
    <div className='fixed top-0 left-0 w-full'>
    <div className='h-[60px] p-4 flex justify-between items-center bg-green-500 min-[480px]:px-6 min-[768px]:px-8 min-[1024px]:px-[40px]'>
          <div className='h-full flex items-center gap-4'>
            <img src={LogoImg} className='h-full rounded-full' alt="" />
            <div>
              <span>Nutritrack365</span>
            </div>
          </div>
          <div>
            {
              hasNonNullProperty(user) && <ul className='flex gap-4 m-0 p-0 justify-between max-[480px]:hidden'>
                <li>
                  <Link to={"/account"} className='flex w-[100px] h-[40px] justify-center items-center rounded-2xl text-white border-white border'>
                      Account
                  </Link>
                  
                </li>
                <li>
                <Link onClick={(e) => logout(e) } className='flex w-[100px] h-[40px] justify-center items-center rounded-2xl text-white border-white border'>
                      Log out
                  </Link>
                </li>
              </ul>
            }
            {!hasNonNullProperty(user) && <ul className='flex gap-4 m-0 p-0 justify-between max-[480px]:hidden'>
              <li>
                <Link to={"/login"} className='flex w-[100px] h-[40px] justify-center items-center rounded-2xl text-white border-white border' id='navbar-login'>
                  <span>
                    Log in 
                  </span> 
                </Link>
              </li>
              <li>
                <Link to={"/signup"} className='flex w-[100px] h-[40px] justify-center items-center rounded-2xl text-gray-400 bg-white' id='navbar-signup'>
                  <span>
                    Sign up
                  </span> 
                </Link>
              </li>
            </ul>}
            <div className='block min-[480px]:hidden'>
              {!activeMenu && <RxHamburgerMenu size={30} onClick={() => setActiveMenu(true)} />}
              {activeMenu && <IoMdClose size={30} onClick={() => {setActiveMenu(false)}} />}
            </div>
          </div>
              {activeMenu && !hasNonNullProperty(user) && 
              <ul className='absolute top-[60px] left-0 w-full bg-green-500' >
                <li className='block px-4 h-10'>
                  <Link to={"/login"} >Log in</Link>
                </li>
                <li className='block px-4 h-10'>
                  <Link to={"/signup"} >Sign up</Link>
                </li>
              </ul>}
              {activeMenu && hasNonNullProperty(user) && (
                <ul className='absolute top-[60px] left-0 w-full bg-green-500'>
                  <li className='block px-4 h-10'>
                    <Link to={"/signup"} >Account </Link>
                  </li>
                  <li className='block px-4 h-10'>
                    <Link to={"/signup"}> Log out </Link>
                  </li>
                </ul>
              )}
        </div>
    </div>
  )
}

