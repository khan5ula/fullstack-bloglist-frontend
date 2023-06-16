import { useRef } from 'react'
import PropTypes from 'prop-types'

import LoginForm from './LoginForm'
import BlogCreator from './BlogCreator'
import Togglable from './Togglable'
import Blog from './Blog'

/*  
    This component acts as a mediator between App,
    BlogCreator and LoginForm.
    
    The purpose of component is to check 
    whether the user is logged in and then render 
    the proper output.
*/

const LoginSwitch = ({
  user,
  blogs,
  setBlogs,
  handleLogout,
  setNotificationMessage,
  setNotificationType,
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
  
  const blogCreatorRef = useRef()

  if (user === null) {
    return (
      <div>
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
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        {' '}
        <button onClick={handleLogout}>logout</button>
        <br />
      </p>

      {/* Toggle visible functionality for blog adding */}
      <Togglable buttonLabel="create new blog" ref={blogCreatorRef}>
        <BlogCreator
          setBlogs={setBlogs}
          blogs={blogs}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
          user={user}
        />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      )}
    </div>
  )
}

LoginSwitch.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginSwitch