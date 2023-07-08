import { Link } from 'react-router-dom'
import Notification from './Notification'

const Menu = () => {
  const padding = {
    paddingRight: 10,
  }
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
    </div>
  )
}

export default Menu
