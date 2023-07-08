import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { getUsers, setUser } from './reducers/userReducer'

import { Route, Routes, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.user.allUsers)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setNotification(`${user.name} logged out`, 5000))
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  const viewUser = match ? users.find((a) => a.id === match.params.id) : null

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {'\u{1F464} '}
        {`${user.name} `}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
        <br />
      </p>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={viewUser} />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
