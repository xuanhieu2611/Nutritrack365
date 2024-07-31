import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { UserAuth } from '../Context/AuthContext';
export const UserMetrics = () => {
    const {user} = UserAuth()
    const UID = user.UID
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = year + "-" + month + "-" + day;
    function verifySameDate(date1, date2) {
        return date1.slice(0, 10) === date2.slice(0, 10);
    }
    const [allUsers,setAllUsers] = useState([])
    const [dailyExercise,setDailyExercise] = useState([])
    const [pastExercise,setPastExercise] = useState([])
    const [exerciseOption,setExerciseOption] = useState([])
  const [userCount, setUserCount] = useState([]);
  const [division, setDivision] = useState(false)
  const [userTab, setUserTab] = useState(false)
  const [countView, setCountView] = useState(false)


    const fetchAllUsers = () => {
        axios.get(`http://localhost:4000/api/users/`)
          .then(response => {
            setAllUsers(response.data)
        setUserTab(true)
        setDivision(false);
        setCountView(false)
        console.log(response.data)
          })
          .catch(error => {
            console.error(error);
          });
    }
    const fetchPastData = () => {
        axios.get(`http://localhost:4000/api/exercises/specific/otherdate?UID=${UID}&date=${date} `) // get all exercises done by the user not today
          .then(response => {
                setPastExercise(response.data)
          })
          .catch(error => {
            console.error(error);
          });
    }

    useEffect(() => {
    fetchAllUsers()
          axios.get(`http://localhost:4000/api/exercises/`)
          .then((response) => {
            const allExercises = response.data
            const uniqueExerciseName = Array.from(new Set(allExercises.map(item => item.ActivityName))).sort();
            setExerciseOption(uniqueExerciseName)
          })
          .catch(err => {
            console.log(err)
          })
      }, []);  

    const [activePopup,setActivePopup] = useState(false)

    const [filterVals,setFilterVals] = useState({
        ActivityName: null,
        Date: null
    })


    const handleUserInput = (e) => {
        e.preventDefault();
        
        
        axios.get(`http://localhost:4000/api/utils/allSports`

        ).then(response => {
            console.log("Exercise added successfully:", response.data);
            setAllUsers(response.data)
            setUserTab(true)
            setCountView(false)
            setDivision(false)
        }).catch(error => {
            console.error("Error adding exercise:", error);
        });
    }

  const fetchAllSportsUsers = () => {
    axios.get('http://localhost:4000/api/util/allSports').then(response => {
      setAllUsers(response.data);
      setDivision(true)
      setUserTab(false)
      setCountView(false)
      })}

 
  
  const resetUsers = () => {
    fetchAllUsers();
  }
    
const findAllSportsUsers = () => {
    fetchAllSportsUsers();
  }

const countUsers = () => {
    axios.get('http://localhost:4000/api/util/count').then(response => {
      setUserCount(response.data);
      setDivision(false)
      setUserTab(false)
      setCountView(true)
      })}
    
    return (
    <div className='w-full' >
        <h1 className='text-[24px] font-bold'>
            User Metrics
        </h1>   

      <div className='flex w-full justify-center mt-4'>
        <div className='w-4/5 flex justify-between'>
        <button onClick={findAllSportsUsers} className='bg-green-500 px-4 py-3 rounded-3xl' >
          Users who have done all exercises
        </button>
        <button onClick={resetUsers} className='bg-red-500 px-4 py-3 rounded-3xl' >
          Reset
        </button>
        <button onClick={countUsers} className='bg-green-500 px-4 py-3 rounded-3xl' >
          Count of Users per Exercise
        </button>
      </div>

      </div>

      {userTab && <div className='mt-10'>
        <ul className='grid gap-4' >
              <li  className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                <h2> User </h2>
                <h2> Height </h2>
                <h2> Weight </h2>
                <h2> Goal ID </h2>
                <h2> Recommendation ID </h2>
              </li>
            </ul>
        
        
        <br />
            {
            allUsers.length === 0 && (
                <h1 className='text-center'>No history</h1>
            )
            }
            <ul className='grid gap-4' >
                {allUsers && allUsers.map && allUsers.map((item,index) => {
                    return (
                        <li key={index} className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                            <span>{item.UID}</span>
                            <span>{item.Height != null ? item.Height +  " cm" : "" }</span>
                            <span>{item.Weight != null ? item.Weight +  " kg" : "" }</span>
                            <span>{item.GoalId != null ? item.GoalId : "None" }</span>
                            <span>{item.RecommendID != null ? item.RecommendID : "None" }</span>
                        </li>
                    )
                })
                }
            </ul>
        </div>
      }
      {division && <div className='mt-10'>
        <ul className='grid gap-4' >
              <li  className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                <h2> User </h2>
              </li>
            </ul>
        
        
        <br />
            {
            allUsers.length === 0 && (
                <h1 className='text-center'>No Users have done all exercises</h1>
            )
            }
            <ul className='grid gap-4' >
                {allUsers && allUsers.map && allUsers.map((item,index) => {
                    return (
                        <li key={index} className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                            <span>{item.UID}</span>
                        </li>
                    )
                })
                }
            </ul>
        </div>
      }
      {countView && <div className='mt-10'>
        <ul className='grid gap-4' >
              <li  className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                <h2> Count </h2>
                <h2> Exercise </h2>
              </li>
            </ul>
        
        
        <br />
            {
            userCount.length === 0 && (
                <h1 className='text-center'>No history</h1>
            )
            }
            <ul className='grid gap-4' >
                {userCount && userCount.map && userCount.map((item,index) => {
                    return (
                        <li key={index} className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                            <span>{item.numUsers}</span>
                            <span>{item.ActivityName}</span>
                        </li>
                    )
                })
                }
            </ul>
        </div>
      }


        {
            activePopup && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
                    <div className='w-[400px] h-[300px] z-20 bg-white p-4 rounded-2xl shadow-2xl relative pt-[60px] first-line grid grid-cols-1' >
                        <div className='absolute right-0 top-1'>
                        <IoIosClose size={30} onClick={() => setActivePopup(false)} />
                        </div>
                        <h2 className='text-[20px] font-semibold'>Filter Users</h2>
                        <div className='flex w-full justify-between items-center'>
                            <label htmlFor="" className='text-black'> Date</label>
                            <div className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl'>
                                <input type='Date' name='Date' className='outline-none focus:outline-none bg-transparent' onChange={handleInputChange} />   
                            </div>
                        </div>
                        <div className='flex w-full justify-between items-center'>
                            <label htmlFor="">User Metrics</label>
                            <select name="ActivityName" id="" className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl outline-none focus:outline-none' onChange={handleInputChange}>
                                <option value=""></option>
                                {exerciseOption.map((item,index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <button className=' bg-green-500 py-1 px-5 h-10 rounded-3xl' onClick={handleUserInput} >Filter</button>
                        </div>
                    </div>                        
                </div>
            )
        }

    </div>
  )
}

