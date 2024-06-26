import React, { useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import DataAcess from '../apis/DataAcess'
import io from 'socket.io-client';


const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const validation= ()=>{
    setEmailError('')
    setPasswordError('')
  
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
  }

  
  const logIn = () => {
    const socket = io("http://localhost:3001/");
   DataAcess.post('/user/login', { email, password })
      .then((data) => {
        if (data) { 
          const username = data.data.username 
          socket.emit('join', username);
          navigate('/home',{state:{username}})
        } else {
          window.alert('Wrong email or password')
        }
      })
    }
  
  const onButtonClick = () => {
    validation()
    logIn()
    
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          type='password'
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <p>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
            Register here
          </Link>
        </p>
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login