import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const listBlogs = () => {
    if (!user.blogs || user.blogs.length === 0) {
      return (
        <div>
          {`${user.name} does not have any blogs`}
          <br />
          <br />
        </div>
      )
    }

    return (
      <div>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {listBlogs()}
      <button
        id="back-button"
        style={{ display: 'inline' }}
        onClick={() => navigate('/users')}
      >
        ⬅️ back to users
      </button>
    </div>
  )
}

export default User
