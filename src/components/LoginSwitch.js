import LoginForm from './LoginForm'
import BasicButton from './BasicButton'
import BlogCreator from './BlogCreator'

const LoginSwitch = ({ user, blogs, setBlogs, Blog, handleLogout, ...loginProps }) => {
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
        <BasicButton event={handleLogout} text={'logout'} />
        <br />
      </p>
      <BlogCreator blogs={blogs} setBlogs={setBlogs}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoginSwitch