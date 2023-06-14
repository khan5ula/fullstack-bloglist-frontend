import LoginForm from './LoginForm'
import BasicButton from './BasicButton'
import BlogCreator from './BlogCreator'

const LoginSwitch = ({ props }) => {
  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={props.username}
          password={props.password}
          setUsername={props.setUsername}
          setPassword={props.setPassword}
          handleLogin={props.handleLogin}
        />
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
      <BlogCreator
        blogs={props.blogs}
        setBlogs={props.setBlogs}
        notificationMessage={props.notificationMessage}
        setNotificationMessage={props.setNotificationMessage}
        notificationType={props.notificationType}
        setNotificationType={props.setNotificationType}
      />

      {props.blogs.map(blog =>
        <props.Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoginSwitch