import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Card } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Card className="mt-4">
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        <div className={visible ? 'd-none' : ''}>
          <Button variant="success" size="sm" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
        <div className={visible ? '' : 'd-none'}>{props.children}</div>
      </Card.Body>
      {visible && (
        <Card.Footer>
          <Button
            variant="outline-secondary"
            size="sm"
            id={props.id}
            onClick={toggleVisibility}
          >
            close
          </Button>
        </Card.Footer>
      )}
    </Card>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
