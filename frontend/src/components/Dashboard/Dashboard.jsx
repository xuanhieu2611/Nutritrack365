import React, { useEffect, useState } from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { UserAuth } from '../Context/AuthContext';
import axios from 'axios'
export const Dashboard = () => {
  const {user} = UserAuth()
  const UID = user.UID
  const [userRecord, setUserRecord] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [goal, setGoal] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = year + "-" + month + "-" + day;
  
  const [defaultGoal,setDefaultGoal] = useState({})
  const fetchRecord = () => {
    axios.get(`http://localhost:4000/api/record/specific/date?UID=${UID}&date=${date}`)
      .then(response => {
        console.log("HIEU", response.data[0]);
        setUserRecord(response.data[0])
        console.log("userRecord",userRecord)
      })
      .catch(error => {
        console.error(error)
      });
  }

  const fetchCurrentUser = () => {
    axios.get(`http://localhost:4000/api/users/${UID}`)
      .then(response => {
        console.log(UID)
        setCurrentUser(response.data[0])
        console.log(response.data[0]);
        if (response.data[0].GoalId === null){
          alert("Default goal G1 is set")              
          axios.get(`http://localhost:4000/api/goal`).then(response => {
            console.log("first",response.data[0])
            setGoal(response.data[0])
          }).catch(error => 
            {
              console.log(error)
            }
          )
        } else {
          axios.get(`http://localhost:4000/api/goal/specific?goalId=${response.data[0].GoalId}`)
            .then(res => {
              // if (!res.data[0]) {
                setGoal(res.data[0])
              // } else {
              // }
            }
          )
            .catch(error => {
              console.error(error)
            });
        }
      })
      .catch(error => {
        console.error(error)
      });
  }

  const fetchRecommendation = () => {
      axios.get(`http://localhost:4000/api/recom`).then(response => {
        console.log(response.data)
        setRecommendations(response.data)
      })
  }



  useEffect(() => {
    fetchRecord()
    fetchCurrentUser()
    fetchRecommendation()
  },[])


  // const UserRecord = {
  //   RecordId: "R1",
  //   Calories: 1800,
  //   Protein: 500,
  //   Fat: 400
  // }

  const Goal = {
    GoalID: "G4",
    Calories: 2000,
    Protein: 400,
    Fat: 450
  }

  // const Recommendations = [
  //   {
  //     RecommendID: "Recomend1",
  //     RecommendedFood: "Salmon Salad",
  //     imgUrl: "https://www.recipetineats.com/wp-content/uploads/2019/07/Salmon-Salad_1.jpg"
  //   },
  //   {
  //     RecommendID: "Recomend2",
  //     RecommendedFood: "Grilled Chicken with Quinoa",
  //     imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNK3d0bInvbdS2mG3vhb63VfownApTfXaY51AAiKLAuQ&s"
  //   },
  //   {
  //     RecommendID: "Recomend3",
  //     RecommendedFood: "Vegetable Stir-Fry",
  //     imgUrl: "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg"
  //   },
  //   {
  //     RecommendID: "Recomend4",
  //     RecommendedFood: "Greek Yogurt Parfait",
  //     imgUrl: "https://foolproofliving.com/wp-content/uploads/2017/12/Greek-Yogurt-Parfait-Recipe.jpg"
  //   }
  // ];

  const [Recommendations,setRecommendations] = useState([])

  return (
    <div className='w-full'>
      <h1 className='font-bold text-[24px]' >Dashboard</h1>
      <div>
        <h2 className='text-base mb-4' >Daily record</h2>
        <div className='grid grid-cols-3 w-full h-[250px] gap-10'>
          <div className='col-span-1 bg-gray-300 h-full rounded-2xl p-4 grid'> 
            <h3 className='text-center text-[20px] font-medium' >Calories</h3>
            <div className="flex justify-center items-center">
              <CircularProgressbar className='w-[150px] h-[150px]' value={userRecord.Calories/goal.Calories * 100} text={`${(userRecord.Calories/goal.Calories * 100).toFixed(2)}%`} ></CircularProgressbar>
            </div>
            <p className='text-center'>{userRecord.Calories | 0} out of {goal.Calories | 1} calories</p>
          </div>
          <div className='col-span-1 bg-gray-300 h-full rounded-2xl p-4 grid'> 
            <h3 className='text-center text-[20px] font-medium' >Protein</h3>
            <div className="flex justify-center items-center">
              <CircularProgressbar className='w-[150px] h-[150px]' value={userRecord.Protein/goal.Protein * 100} text={`${(userRecord.Protein/goal.Protein * 100).toFixed(2)}%`} ></CircularProgressbar>
            </div>
            <p className='text-center'>{userRecord.Protein | 0} out of {goal.Protein |1} g</p>
          </div>
          <div className='col-span-1 bg-gray-300 h-full rounded-2xl p-4 grid'> 
            <h3 className='text-center text-[20px] font-medium' >Fat</h3>
            <div className="flex justify-center items-center">
              <CircularProgressbar className='w-[150px] h-[150px]' value={userRecord.Fat/goal.Fat * 100} text={`${(userRecord.Fat/goal.Fat * 100).toFixed(2)}%`} ></CircularProgressbar>
            </div>
            <p className='text-center'>{userRecord.Fat | 0} out {goal.Fat| 1} g</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className='mt-4' >Recommendation</h2>
        <div className='grid grid-cols-5 w-full h-[80px] gap-10'>
          {Recommendations && Recommendations.map && Recommendations.map((item,index) => {
            return (
              <div key={index} className='col-span-1 bg-gray-300 h-full rounded-2xl p-4'> 
                <div className='flex flex-col justify-center items-center'>
                  <h3>{item.RecommendedFood}</h3>
                 
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  )
}

