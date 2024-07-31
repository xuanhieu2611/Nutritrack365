import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const User = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const {uid} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/${uid}/`)
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  

  const Goal = ({name, showing}) => {
    if (showing) {
      return <td>{name}</td>
    } else {
      return null;
    }
  }

  const Recommendation = ({name, showing}) => {
    if (showing) {
      return <td>{name}</td>
    } else {
      return null;
    }
  }

  const handleDelete = () => {
    axios.get(`http://localhost:4000/api/delete/${uid}/`)
      .then(response => {
        toast.success("User Successfully Deleted");

        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch(error => {
        console.log(error)
      });
  }

  const UserInfo = () => {
    if (data.length === 0) {
      return (<div>User Doesn't Exist</div>)
    } else {
      return ( 
        <div className="App">
          <table>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Goal</th>
              <th>Recommendation</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.Name}</td>
                  <td>{val.Weight}</td>
                  <td>{val.Height}</td>
                  <Goal showing={val.GoalId !== null} name={val.GoalId}/>                           
                  <Recommendation showing={val.RecommendID !== null} name={val.RecommendID}/>                        
                </tr>
              )
            })}
          </table>
          <button onClick={handleDelete}>Delete User</button>
          <ToastContainer/>
        </div>
      )}
  }



  return (
    <UserInfo/>
  )};


export default User
