import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { Link } from 'react-router-dom';
export const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <div className='footer-container p-4 bg-green-500 min-[480px]:px-6 min-[768px]:px-8 min-[1024px]:px-10'>
    <div className='grid grid-cols-1 gap-10 min-[768px]:grid-cols-2'>
        <div>
            <h1 className='text-[24px]' >Nutritrack 365</h1>
            <p>
            Our innovative application serves as a tool for individuals to maintain a balanced diet and enhance their overall wellness. By seamlessly tracking their daily food intake and exercise/activity levels, users gain valuable insights into their health journey. Our platform goes beyond mere monitoring, providing personalized recommendations meticulously crafted to align with each user's unique goals and aspirations. Whether it's achieving weight loss milestones, building muscle, or simply fostering a healthier lifestyle, our app is dedicated to supporting and empowering individuals every step of the way.
            </p>
        </div>
        <div>
            <ul className='flex h-full flex-col justify-center gap-4 m-0'>
                <li className='flex items-center'> 
                <CiLocationOn />
                <span className='ml-2'>Vancouver, BC, Canada</span>
                </li>
                <li>
                    <Link to={"https://github.students.cs.ubc.ca/CPSC304-2023W-T2/project_e5n5h_m4p5v_s3b9t"} className='flex items-center text-black'>
                        <IoLogoGithub />
                        <span className='ml-2'>Github</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
        <div className='mt-2 w-full flex justify-center'>
            <span>
                @{year}. All rights reserved.
            </span>
        </div>

    </div>

  )
}

