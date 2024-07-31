import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { UserAuth } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Exercise = () => {
    const [error,setError] = useState(null)
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
    const [dailyExercise,setDailyExercise] = useState([])
    const [pastExercise,setPastExercise] = useState([])
    const [exerciseOption,setExerciseOption] = useState([])

    const fetchDailyData = () => {
        axios.get(`http://localhost:4000/api/exercises/specific/date?UID=${UID}&date=${date}`) // get all exercises done by the user today
          .then(response => {
            setDailyExercise(response.data)
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
          axios.get(`http://localhost:4000/api/exercises/specific/date?UID=${UID}&date=${date}`) // get all exercises done by the user today
          .then(response => {
                console.log(response.data);
                setDailyExercise(response.data)
          })
          .catch(error => {
            console.error(error);
          });
          axios.get(`http://localhost:4000/api/exercises/specific/otherdate?UID=${UID}&date=${date} `) // get all exercises done by the user not today
          .then(response => {
                setPastExercise(response.data)
          })
          .catch(error => {
            console.error(error);
          });
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

    const [newExercise,setNewExercise] = useState({
        ActivityName: null,
        Date: null,
        Hour: null
    })

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setNewExercise({
            ...newExercise,
            [name]: value
        })
    }

    const handleUserInput = (e) => {
        e.preventDefault();
        
        if (!newExercise.Date ||!newExercise.ActivityName || !newExercise.Hour) {
            setError("Please fill in all required fields")
            console.log("Please fill in all required fields");
            return;
        }

        if (!Number.isInteger(Number(newExercise.Hour))){
            setError("Hour must be an integer")
            return;
        }
        
        axios.post(`http://localhost:4000/api/exercises?UID=${UID}&date=${newExercise.Date}&activityName=${newExercise.ActivityName}&hour=${newExercise.Hour}`

        ).then(response => {
            console.log("Exercise added successfully:", response.data);
            toast.success("Exercise Added successfully")
            fetchDailyData();
            fetchPastData();
            setActivePopup(false);
            setNewExercise({
                ActivityName: null,
                Date: null,
                Hour: null
            })
        }).catch(error => {
            console.error("Error adding exercise:", error);
            toast.error("Error adding exercise:")
        });
    }

  const deleteExercise = (activityName, date) => {
    axios.delete(
      `http://localhost:4000/api/exercises?UID=${UID}&date=${date}&activityName=${activityName}`
    ).then(response => {
        console.log("Exercise deleted successfully:", response.data)
        toast.success("Exercise deleted successfully")
        fetchDailyData();
        fetchPastData();
      }).catch(error => {
        console.error("Error deleting exercise:", error);
        toast.error("Error deleting exercise")
        });
      }

  const DeleteButton = (activity) => {
    const activityName = activity["activityName"]
    const date = activity["date"].slice(0,10)
    return <button className='' onClick={() => deleteExercise(activityName, date)}><MdDelete/></button>
  }
    

    
    return (
    <div className='w-full' >
      <ToastContainer/>
        <h1 className='text-[24px] font-bold'>
            Exercise
        </h1> 

        <div className='flex justify-center'>
            <button onClick={() => setActivePopup(true)} className='bg-green-500 px-4 py-3 rounded-3xl' >
                Add exercise
            </button>
        </div>

        <div>
            <h2 className='font-medium' >Daily exercises</h2>
            {
                dailyExercise.length === 0 && (
                    <div className='text-center my-2'>You didn't exercise today. Let's start exercising.</div>
                )
            }
            <ul className='grid gap-4' >
                {dailyExercise && dailyExercise.map && dailyExercise.map((item,index) => {
                    return (
                        <li key={index} className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                            <span>{item.ActivityName}</span>
                            <span className=''>{new Date(item.Date).toLocaleDateString()}</span>
                            <span>{item.Hours} Hours</span>
                            <DeleteButton activityName={item.ActivityName} date={item.Date}/>
                        </li>
                    )
                })
                }
            </ul>
        </div>

        <div className='mt-10'>
            <h2 className='font-medium' >Past exercises</h2>
            {
            pastExercise.length === 0 && (
                <h1 className='text-center'>No history</h1>
            )
            }
            <ul className='grid gap-4' >
                {pastExercise && pastExercise.map && pastExercise.map((item,index) => {
                    return (
                        <li key={index} className='h-[48px] w-full bg-gray-300 rounded-3xl flex justify-between py-3 px-8'>
                            <span>{item.ActivityName}</span>
                            <span>{new Date(item.Date).toLocaleDateString()}</span>
                            <span>{item.Hours} Hours</span>
                            <DeleteButton activityName={item.ActivityName} date={item.Date}/>
                        </li>
                    )
                })
                }
            </ul>
        </div>

        {
            activePopup && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
                    <div className='w-[400px] h-[300px] z-20 bg-white p-4 rounded-2xl shadow-2xl relative pt-[60px] first-line grid grid-cols-1' >
                        <div className='absolute right-0 top-1'>
                        <IoIosClose size={30} onClick={() => setActivePopup(false)} />
                        </div>
                        <h2 className='text-[20px] font-semibold'>New exercise</h2>
                        <div className='flex w-full justify-between items-center'>
                            <label htmlFor="" className='text-black'> Date</label>
                            <div className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl'>
                                <input type='Date' name='Date' className='outline-none focus:outline-none bg-transparent' onChange={handleInputChange} />   
                            </div>
                        </div>
                        <div className='flex w-full justify-between items-center'>
                            <label htmlFor="">Exercise</label>
                            <select name="ActivityName" id="" className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl outline-none focus:outline-none' onChange={handleInputChange}>
                                <option value=""></option>
                                {exerciseOption.map((item,index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex w-full justify-between items-center'>
                            <label htmlFor="" className='text-black'>Hours</label>
                            <div className='bg-gray-300 py-1 px-4 flex justify-center rounded-3xl w-[100px]'>
                                <input type='number' name='Hour' min={0} className='outline-none focus:outline-none bg-transparent w-full' onChange={handleInputChange} />   
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
                        
                    </div>
                </div>
                </div>
            )}
    </div>
  )
}

