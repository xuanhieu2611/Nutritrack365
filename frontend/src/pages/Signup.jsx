import axios from 'axios'
import { useState, useEffect, React } from 'react'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  
  let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [height, setHeight] = useState('')
  const [heightError, setHeightError] = useState('')
  const [weight, setWeight] = useState('')
  const [weightError, setWeightError] = useState('')

  const onButtonClick = () => {
    // Set initial error value to empty
    const weightHeightRegex = new RegExp('^[0-9]+$');
    const nameRegex = new RegExp('/^[a-z]{0,25}$/')
    setWeightError('');
    setHeightError('');
    setNameError('');
    setUsernameError('');
    // Check if the user has entered username 
    if ('' === username) {
      setUsernameError('Please Enter a Valid Username')
    } else {
      checkAccount((accountExists) => {
        if (accountExists) {
          toast.error("A user with this username already exists") 
        } else {
          createAccount();
          navigate(`/users/${username}`)
        }
      })
    }
    if (!(nameRegex.test(name))) {
      setNameError('Please enter a valid name');
    }
    if (!(weightHeightRegex.test(weight))) {
      setWeightError('Please enter a valid weight');
    }
    if (!(weightHeightRegex.test(height))) {
      setHeightError('Please enter a valid height');
    }
  }
  
  const checkAccount = (callback) => {
    console.log(JSON.stringify({ username }));
    fetch('http://localhost:4000/api/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((r) => {
        callback(r?.userExists)
      })
    }
  const createAccount = () => {
    console.log(JSON.stringify({ username }));
    fetch('http://localhost:4000/api/users/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, height, weight, name }),
    })
    }



  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Signup</div>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={username}
          placeholder="Username"
          onChange={(un) => setUsername(un.target.value)}
          className="inputBox"
        />
        <label className='usernameError'>{usernameError}</label>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={name}
          placeholder="Name"
          onChange={(un) => setName(un.target.value)}
          className="inputBox"
        />
        <label className='nameError'>{nameError}</label>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={height}
          placeholder="Height (cm)"
          onChange={(un) => setHeight(un.target.value)}
          className="inputBox"
        />
        <label className='heightError'>{heightError}</label>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={weight}
          placeholder="Weight (kg)"
          onChange={(un) => setWeight(un.target.value)}
          className="inputBox"
        />
        <label className='weightError'>{weightError}</label>
      </div>
      <div className='inputContainer'>
        <input
          value={"Create Account"}
          onClick={onButtonClick}
          className="inputButton"
          type="button"
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
