
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const {uid} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:4000/api/allUsers`)
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
      return <td>None Found</td>;
    }
  }

  const Recommendation = ({name, showing}) => {
    if (showing) {
      return <td>{name}</td>
    } else {
      return <td><button>None Found</button></td>;
    }
  }


return (
        <div className="App">
            <table>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Goal</th>
                    <th>Recommendation</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.UID}</td>
                            <td>{val.Name}</td>
                            <td>{val.Weight}</td>
                            <td>{val.Height}</td>
                            <Goal showing={val.GoalId !== null} name={val.GoalId}/>
                            <td>{val.Recommendation ? "Recommendation" : "no Reco"}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
  )};

export default AllUsers
