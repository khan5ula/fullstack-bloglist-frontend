import { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/userReducer'

const LoginForm = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [spin, setSpin] = useState(false)

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
    setSpin(true)
    try {
      dispatch(login(credentials))
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setSpin(false)
      }, 1500)
    }
    setCredentials({ username: '', password: '' })
  }

  const spinner = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )

  return (
    <Container>
      <h2 style={{ marginTop: '20px' }}>Log in to use Blog App</h2>
      {spin && spinner()}
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
            style={{ marginBottom: '10px' }}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={credentials.password}
            id="password-form"
            onChange={handlePasswordChange}
            style={{ marginBottom: '15px' }}
          />
        </Form.Group>
        <Button variant="primary" size="sm" type="submit">
          login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm
