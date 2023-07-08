import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/userReducer'

const LoginForm = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleUsernameChange = (event) => {
    setCredentials({ ...credentials, username: event.target.value })
  }

  const handlePasswordChange = (event) => {
    setCredentials({ ...credentials, password: event.target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(credentials))
    setCredentials({ username: '', password: '' })
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username-form"
          type="text"
          value={credentials.username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id="password-form"
          type="password"
          value={credentials.password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
