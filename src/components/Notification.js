import { useState } from 'react'
import { Alert, Container, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const [show, setShow] = useState(true)
  const notification = useSelector((state) => state.notification)

  if (show) {
    return (
      <Container>
        {notification && (
          <Alert
            variant="info"
            onClose={() => setShow(false)}
            dismissible
            style={{
              marginTop: '20px',
            }}
          >
            {notification}
          </Alert>
        )}
      </Container>
    )
  }
}

export default Notification
