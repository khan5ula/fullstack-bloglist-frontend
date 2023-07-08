import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

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
    <div className="container">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label style={{ marginTop: '15px' }}>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={credentials.username}
            id="username-form"
            onChange={handleUsernameChange}
            style={{ marginBottom: '10px', width: '50%' }}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={credentials.password}
            id="password-form"
            onChange={handlePasswordChange}
            style={{ marginBottom: '15px', width: '50%' }}
          />
        </Form.Group>
        <Button variant="primary" size="sm" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
