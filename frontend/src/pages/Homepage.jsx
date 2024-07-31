import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import LandingWhyImg from "../img/background-landing-2.jpg"
import BgLandingPage from "../img/background-landing.jpg"
export const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={`h-[70vh] flex flex-col items-center justify-center`} style={{backgroundImage:`url(${BgLandingPage})`}}>
        <h1 className='text-2xl p-4 m-0 text-center min-[480px]:text-[32px] min-[768px]:text-[40px] text-green-500 font-bold' >
          Leading health tracking apps !
        </h1>
        <Link to={"/login"} className='rounded-2xl px-4 py-2 bg-green-500 text-white shadow-lg' id='trynow-btn'>
              Try now
        </Link>
      </div>
      <div id='landing-why' className=' bg-yellow-300 p-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:px-6 min-[768px]:px-8 min-[1024px]:px-10' >
        <div>
        <h2 className='text-2xl p-4 m-0 text-center min-[480px]:text-[32px] min-[768px]:text-[36px]' >Why using our app ? </h2>
        <ol>
          <li className='text-base min-[480px]:text-xl mb-2'>Effortless calories tracking</li>
          <li className='text-base min-[480px]:text-xl mb-2'>Verified food database</li>
          <li className='text-base min-[480px]:text-xl mb-2'>Support for any diet</li>
        </ol>
        </div>
        <div>
          <img src={LandingWhyImg} className='w-full h-full object-cover rounded-[45px]' alt="" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

