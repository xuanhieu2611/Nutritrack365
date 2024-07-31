import React, { useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import axios from 'axios'
import { UserAuth } from '../Context/AuthContext';
export const FavoriteFood = () => {
  const {user} = UserAuth()
  const UID = user.UID

  const [error,setError] = useState(null)
  const [FavoriteFood,setFavoriteFood] = useState([])
  const [allFavFood,setAllFavFood] = useState([])
  const TypeFood = ["Meat","Fruit","Vegetable"]

  const fetchFavoriteFood = () => {
    axios.get(`http://localhost:4000/api/favourite/specific?UID=${UID}`).then(response => {
        setFavoriteFood(response.data)
        // console.log("XUANHIEU", response.data);
    }).catch(error => {
      console.log(error)
      setError(error)
    })
  }  

  const fetchAllFoodName = () => {
    axios.get(`http://localhost:4000/api/favourite/`).then(response => {
        setAllFavFood(response.data)
    }).catch(error => {
        
    })
  }

  const [activePopup,setActivePopup] = useState(false)

  const [newFavoriteFood,setNewFavoriteFood] = useState(null)

const handleUserInput = (e) => {
    e.preventDefault()

    console.log(newFavoriteFood)

    axios.post(`http://localhost:4000/api/favourite?UID=${UID}`)

    setNewFavoriteFood(null
    )

    setActivePopup(false)
}

useEffect(() => {
   fetchFavoriteFood()
  // fetchAllFoodName()
},[])
  return (
    <div>
      <h1 className='text-[24px] font-bold'>
        Favorite food
      </h1>

      <div className='flex justify-center'>
            
        </div>

        {
          FavoriteFood.length === 0 && (
            <div className='my-4'>

              <h1 className='text-center'>No history</h1>
            </div>
          )
        }

        <ul className='grid gap-4 mt-10'>
          {
            FavoriteFood && FavoriteFood.map && FavoriteFood.map((item,index) => {
              return (
                <li key={index} className='bg-gray-300 flex items-center justify-between w-full h-[48px] rounded-3xl py-3 px-8'>
                  <span className='uppercase'>
                    {item.FoodName}
                  </span>
                  <span className='uppercase'>
                    {item.typeFood}
                  </span>
                </li>
              )
            })
          }
        </ul>

        

        {activePopup && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
          <div className='w-[400px] h-[300px] z-20 bg-white p-4 rounded-2xl shadow-2xl relative pt-[60px] first-line grid grid-cols-1' >
              <div className='absolute right-0 top-1'>
              <IoIosClose size={30} onClick={() => setActivePopup(false)} />
              </div>
              <h2 className='text-[20px] font-semibold'>New Favorite Food</h2>
              <div className='flex w-full justify-between items-center'>
                  <label htmlFor="" className='text-black'> Food Name</label>
                  <div className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl w-[150px]'>
                      <select name="" id="" onChange={(e) => setNewFavoriteFood(e.target.value)}>
                        {
                          allFavFood.map((item,i) => {
                            return (
                              <option key={i} value={item}>{item}</option>
                            )
                          })
                        }
                      </select>
                  </div>
              </div>
              
              
              <div className='w-full flex justify-center items-center'>
                  <button className=' bg-green-500 py-1 px-5 h-10 rounded-3xl' onClick={handleUserInput} >Add</button>
              </div>
          </div>                        
      </div>
        )}
        
    </div>
  )
}
