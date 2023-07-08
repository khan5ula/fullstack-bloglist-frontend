import { Button } from 'react-bootstrap'
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
        <hr />
        <h3>User's blogs:</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
        <hr />
      </div>
    )
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{user.name}</h2>
      {listBlogs()}
      <Button
        variant="outline-primary"
        size="sm"
        id="back-button"
        style={{ display: 'inline' }}
        onClick={() => navigate('/users')}
      >
        ⬅️ back to users
      </Button>
    </div>
  )
}

export default User
