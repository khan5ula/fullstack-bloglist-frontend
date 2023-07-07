import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
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
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      /* Inform user of successful operation */
      dispatch(setNotification(`${user.name} logged in`, 5000))
      setUsername('')
      setPassword('')

      /* Inform user of error */
    } catch (error) {
      dispatch(setNotification(`error while login: ${error}`, 5000))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    console.log(`Logging out user: ${user.name}`)
    setUser(null)
    dispatch(setNotification(`${user.name} logged out`, 5000))
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)
      .then((updatedBlog) => {
        const updatedBlogs = blogs.map((b) =>
          b.id === blog.id ? updatedBlog : b
        )
        setBlogs(updatedBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
        dispatch(
          setNotification(`liked blog: ${blog.title}, ${blog.author}`, 5000)
        )
      })

      /* Inform user of error */
      .catch((error) => {
        dispatch(setNotification(`updating blog likes failed: ${error}`, 5000))
      })
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
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
        <BlogForm user={user} />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
