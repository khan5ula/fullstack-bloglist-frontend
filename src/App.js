import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginSwitch from './components/LoginSwitch'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      /* Inform user of successful operation */
      setNotificationType('success')
      setNotificationMessage(`${user.name} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      console.log(`${user.name} logged in`)
      setUsername('')
      setPassword('')

      /* Inform user of error */
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    console.log(`Logging out user: ${user.name}`)
    setUser(null)

    /* Inform user of successful operation */
    setNotificationType('success')
    setNotificationMessage(`${user.name} logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notification type={notificationType} message={notificationMessage} />
      <LoginSwitch
        props={{
          user,
          blogs,
          setBlogs,
          Blog,
          handleLogout,
          notificationMessage,
          setNotificationMessage,
          notificationType,
          setNotificationType,
          username,
          password,
          setUsername,
          setPassword,
          handleLogin,
        }}
      />

    </div>
  )
}

export default App