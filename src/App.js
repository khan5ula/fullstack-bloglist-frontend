import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
        <br />
      </p>

      {/* Toggle visible functionality for blog adding */}
      <Togglable
        buttonLabel="create new blog"
        ref={blogFormRef}
        id="create-new-blog-button"
      >
        <BlogForm />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} />
      ))}
    </div>
  )
}

export default App
