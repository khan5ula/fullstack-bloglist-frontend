import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return (
    <div className="container">
      {' '}
      {notification && <Alert variant="success"> {notification} </Alert>}
    </div>
  )
}

export default Notification
