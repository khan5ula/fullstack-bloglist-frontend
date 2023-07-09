import { Button, Card, CloseButton } from 'react-bootstrap'
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
    <Card style={{ marginTop: '20px' }}>
      <Card.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>User details</span>
        {<CloseButton onClick={() => navigate('/users')} />}
      </Card.Header>
      <Card.Body>
        <h2>{user.name}</h2>
        {listBlogs()}
      </Card.Body>
    </Card>
  )
}

export default User
