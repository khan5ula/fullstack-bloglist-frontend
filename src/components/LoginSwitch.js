import LoginForm from './LoginForm'
import BasicButton from './BasicButton'

const LoginSwitch = ({ user, blogs, Blog, handleLogout, ...loginProps }) => {
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm {...loginProps} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        {' '}
        {console.log(`User: ${user.name} logged in`)}
        <BasicButton event={handleLogout} text={'logout'} />
      </p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoginSwitch