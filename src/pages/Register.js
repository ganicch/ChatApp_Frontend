import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataAcess from '../apis/DataAcess'
import { v4 as uuidv4 } from 'uuid';

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [confrimPassword,setConfrimPassword]=useState('')
  const [firstNameError,setFirstNameError] = useState('')
  const [lastNameError,setLastNameError] = useState('')
  const [confrimPasswordError,setConfrimPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const navigate = useNavigate()

  const validation = () =>{
    setEmailError('')
    setPasswordError('')
    setFirstNameError('')
    setLastNameError('')
    setConfrimPasswordError('')
  
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
    if ('' === firstName) {
        setFirstNameError('Please enter your firstname')
        return
      }
      if ('' === lastName) {
        setLastNameError('Please enter your lastname')
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
    if(password!==confrimPassword){
        setConfrimPasswordError('It is not same password')
        return
    }
  }
  const obj = {
    first_name: firstName,
    last_name: lastName,
    username:`User_${uuidv4().split('-')[0]}`,
    email: email,
    password: password
  }
  const onButtonClick = async() => {
    validation()
    if (!emailError && !passwordError && !firstNameError && !lastNameError && !confrimPasswordError) {
        try {
          const response = await DataAcess.post('/user/register', obj)
          console.log(response.data)
          if (response.data.success) {
            navigate(`/`);
          } else {
            console.error('Neuspješna registracija:', response.data.error || 'Server je vratio grešku prilikom registracije');
          }
        } catch (error) {
          console.error('Greška prilikom slanja zahtjeva:', error);
        }
      }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={firstName}
          placeholder="Enter your first name here"
          onChange={(ev) => setFirstName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{firstNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={lastName}
          placeholder="Enter your last name here"
          onChange={(ev) => setLastName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{lastNameError}</label>
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
        <input
          value={confrimPassword}
          type='password'
          placeholder="Confrim your password:"
          onChange={(ev) => setConfrimPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{confrimPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
      </div>
    </div>
  )
}

export default Register