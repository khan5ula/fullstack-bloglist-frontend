import { Button, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingLeft: 10,
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setNotification(`${user.name} logged out`))
    dispatch(setUser(null))
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
          <span
            style={{
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {`🧑🏼‍💼 `}
            {`${user.name} `}
            <Button
              variant="outline-danger"
              size="sm"
              id="logout-button"
              onClick={handleLogout}
              style={{ marginLeft: '10px' }}
            >
              logout
            </Button>
          </span>
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Menu
