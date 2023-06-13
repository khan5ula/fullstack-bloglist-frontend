import LoginForm from './LoginForm';

const LoginSwitch = ({ user, blogs, Blog, ...loginProps }) => {
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoginSwitch