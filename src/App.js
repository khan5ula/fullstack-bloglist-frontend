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
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const users = useSelector((state) => state.user.allUsers)
  const blogs = useSelector((state) => state.blogs)

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
    dispatch(setNotification(`${user.name} logged out`))
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

  const viewUser = matchUser
    ? users.find((a) => a.id === matchUser.params.id)
    : null

  const viewBlog = matchBlog
    ? blogs.find((a) => a.id === matchBlog.params.id)
    : null

  return (
    <div>
      <Notification />
      <p>
        {'\u{1F464} '}
        {`${user.name} `}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
        <br />
      </p>
      <h2>blogs</h2>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={viewUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={viewBlog} />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
