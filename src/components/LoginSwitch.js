import { useRef } from 'react'

import LoginForm from './LoginForm'
import BasicButton from './BasicButton'
import BlogCreator from './BlogCreator'
import Togglable from './Togglable'

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
      <Togglable buttonLabel="new note" ref={blogCreatorRef}>
        <BlogCreator
          setBlogs={props.setBlogs}
          notificationMessage={props.notificationMessage}
          setNotificationMessage={props.setNotificationMessage}
          notificationType={props.notificationType}
          setNotificationType={props.setNotificationType}
        />
      </Togglable>
      <br />

      {/* Print blogs from the database */}
      {props.blogs.map(blog =>
        <props.Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoginSwitch