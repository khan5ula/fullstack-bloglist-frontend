import { useRef } from 'react'

import LoginForm from './LoginForm'
import BasicButton from './BasicButton'
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

const LoginSwitch = ({ props }) => {
  const blogCreatorRef = useRef()

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm props={props} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {props.user.name} logged in
        {' '}
        <BasicButton event={props.handleLogout} text={'logout'} />
        <br />
      </p>

      {/* Toggle visible functionality for blog adding */}
      <Togglable buttonLabel="create new blog" ref={blogCreatorRef}>
        <BlogCreator
          setBlogs={props.setBlogs}
          blogs={props.blogs}
          setNotificationMessage={props.setNotificationMessage}
          setNotificationType={props.setNotificationType}
          user={props.user}
        />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setNotificationMessage={props.setNotificationMessage}
          setNotificationType={props.setNotificationType}
          setBlogs={props.setBlogs}
          blogs={props.blogs}
        />
      )}
    </div>
  )
}

export default LoginSwitch