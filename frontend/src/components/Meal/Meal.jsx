import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { UserAuth } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Meal = () => {
    const [error,setError] = useState(null)
    const formatDate = (today) => {
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const date = year + "-" + month + "-" + day;
        return date
    }
  const {user} = UserAuth()
  const UID = user.UID

//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth() + 1;
//   const day = today.getDate();
  const date = formatDate(new Date());

  const [mealName,setMealName] = useState([])

  

  const [pastMeals,setPastMeals] = useState([])
  const [dailyMeals,setDailyMeals] = useState([])

    const fetchAllMealNames = () => {
      axios.get(`http://localhost:4000/api/eat/meal`)
      .then(response => {
        const allEats =  Array.from(new Set(response.data.map((item, index) => item.MealName))).sort();
        console.log(allEats);
        setMealName(allEats)
  
  
        // setMealName(allEats.map((item,index) => {
        //     return item.MealName
        // }))
  
      })
      .catch(error => {
        setError(error)
      })
    }
  

  const fetchPastMeals = () => {
    axios.get(`http://localhost:4000/api/eat/specific/otherdate?UID=${UID}&date=${date}`)
      .then((response) => {
        console.log("pastmeal",response.data)
        setPastMeals(response.data)
      }).catch(error => {
        console.log(error)
        setError(error)
      })
  }

  const fetchDailyMeals = () => {
    axios.get(`http://localhost:4000/api/eat/specific/date?UID=${UID}&date=${date}`)
      .then((response) => {
        setDailyMeals(response.data)
      }).catch(error => {
        console.log(error)
        setError(error)
      })
  }

  useEffect(() => {
    fetchDailyMeals()
    fetchPastMeals()
    fetchAllMealNames()
  },[])

  const [openDropdowns,setOpenDropdowns] = useState([])


  const [activePopup,setActivePopup] = useState(false)

  const [newMeal, setNewMeal] = useState({
    UID: UID,
    MealName: null,
    Date: null,
    Amount: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({
      ...newMeal,
      [name]: value
    });
  };

  const handleUserInput = (e) => {
    e.preventDefault()

    if (!newMeal.Date ||!newMeal.Amount || !newMeal.MealName) {
      setError("Please fill in all required fields")
      return;
    }
    
    if (!Number.isInteger(Number(newMeal.Amount))){
      setError("Hour must be an integer")
      return;
    }

    console.log("newMeal",newMeal)
    axios.post(`http://localhost:4000/api/eat?UID=${newMeal.UID}&mealName=${newMeal.MealName}&date=${newMeal.Date}&amount=${newMeal.Amount}`)
      .then(response => {
        console.log(response.data)
        toast.success("Meal added successfully")
      }).catch(error => {
        setError(error)
        console.log(error)
      })
    setActivePopup(false)
    setNewMeal({
      UID: UID,
      MealName:  null,
      Date: null,
      Amount: null
    })

    fetchDailyMeals()
    fetchPastMeals()
  }
  const deleteMeal = (mealName, date) => {
    const trimmedDate = formatDate(new Date(date))
    axios.delete(
      `http://localhost:4000/api/eat/?UID=${UID}&mealName=${mealName}&date=${trimmedDate}`
    ).then(response => {
        console.log("Meal deleted succesfully:", response.data)
        fetchDailyMeals()
        fetchPastMeals()
      }).catch(error => {
        toast.error("Error deleting meal");
        console.error("Error deleting meal:", error);
        setError(error)
      });
  }

  const DeleteButton = (meal) => {
    const mealName = meal["mealName"]
    const date = meal["date"]
    return <button onClick={() => deleteMeal(mealName, date, UID)}><MdDelete/></button>
  }
  return (
    <div>
      <ToastContainer/>
      <h1 className='text-[24px] font-bold'>
        Meal
      </h1> 

      <div className='flex justify-center'>
        <button onClick={() => setActivePopup(true)} className='bg-green-500 px-4 py-3 rounded-3xl' >
          Add meal
        </button>
      </div>

      <div>
        <h2 className='font-medium'>Today</h2>
        {
          dailyMeals.length === 0 && (
            <p className='text-center my-2'>
              You didn't eat anything today. Let's start having meal !!!
            </p>
          )
        }
        <ul className='grid gap-4'>
          {dailyMeals && dailyMeals.map && dailyMeals.map((item,index) => {
            return (
              <li key={index} className='bg-gray-300 w-full h-[48px] rounded-3xl px-6 flex items-center'>
                <div className='flex w-full justify-between items-center'>
                  <span>{item.MealName}</span>
                  <div className='flex w-[250px] items-center justify-between'>
                    <span>
                        {item.Amount > 2 ? item.Amount + ' times' : (item.Amount === 2 ? 'Twice' : "Once")}
                    </span>
                    <DeleteButton mealName={item.MealName} date={(new Date().toLocaleDateString())} UID={UID}/>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <h2>Past meals</h2>
        {pastMeals && pastMeals.length == 0 && (
            <h1 className='text-center mt-4'>No history</h1>
        )}
        <ul className='grid gap-4'>
          {pastMeals && pastMeals.map && pastMeals.map((item,index) => {
            return (
              <li key={index}>
                <div className='bg-gray-300 w-full px-6 h-[48px] rounded-3xl flex items-center justify-between'>
                  <span>{item.Date.slice(0,10)} </span>
                  <div className='w-[250px] flex justify-between'>
                    <span>{item.MealName}</span>
                    <span>
                      {item.Amount > 2 ? item.Amount + ' times' : (item.Amount === 2 ? 'Twice' : "Once")}
                    </span>
                    <DeleteButton mealName={item.MealName} date={item.Date} UID={UID}/>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {
        activePopup && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='w-[400px] h-[300px] z-20 bg-white p-4 rounded-2xl shadow-2xl relative pt-[60px] first-line grid grid-cols-1' >
              <div className='absolute right-0 top-1'>
                <IoIosClose size={30} onClick={() => {
                  setActivePopup(false)
                  setNewMeal({
                    UID: UID,
                    MealName:  null,
                    Date: null,
                    Amount: null
                  })
                }
                }  />
              </div>
              <h2 className='text-[20px] font-semibold'>New meal</h2>
              <div className='w-full flex justify-between items-center' >
                <label htmlFor="">Meal name</label>
                <div className='bg-gray-300 w-[180px] h-8 rounded-3xl px-4 flex items-center justify-center'>
                  {/* <input type="text" name='MealName' className='outline-none focus:outline-none w-full bg-transparent' onChange={handleInputChange} /> */}
                  <select name="MealName" id="" className='bg-transparent outline-none flex items-center justify-center' onChange={handleInputChange}>
                    <option disabled selected></option>
                    {mealName && mealName.map && mealName.map((item,index) => {
                      return (
                        <option key={index} value={item}>{item}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className='flex w-full justify-between items-center'>
                <label htmlFor="" className='text-black'> Date</label>
                <div className='bg-gray-300 w-[160px] h-8 rounded-3xl flex items-center px-4'>
                  <input type='date' name='Date' className=' focus:outline-none outline-none bg-transparent' onChange={handleInputChange} />   
                </div>
              </div>
              <div className='flex w-full justify-between items-center'>
                <label htmlFor="">Amount/Number of dishes</label>
                <div className='bg-gray-300 w-[80px] h-8 rounded-3xl flex items-center px-4'>
                  <input type="number" min={1} name='Amount' className='w-full outline-none bg-transparent  ' onChange={handleInputChange} />
                </div>
              </div>


              <div className='w-full flex justify-center items-center'>
                <button className=' bg-green-500 py-1 px-5 h-10 rounded-3xl' onClick={handleUserInput} >Add</button>
              </div>
            </div>                        
          </div>
        )
      }

            {error && (
                <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center'>
                <div className='w-[300px] h-[100px] bg-white relative rounded-3xl shadow-lg'>
                    <div className='absolute right-0 top-1'>
                        <IoIosClose size={30} onClick={() => setError(null)} />
                    </div>
                    <div className='h-full flex justify-center items-center'>
                        <h1>{error}</h1>
                    </div>
                </div>
                </div>
            )}
    </div>
  )
}

