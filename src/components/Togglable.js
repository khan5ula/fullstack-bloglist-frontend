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
      <Card.Body>
        <div className={visible ? 'd-none' : ''}>
          <Button variant="success" size="sm" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
        <div className={visible ? '' : 'd-none'}>
          {props.children}
          <Button
            variant="outline-warning"
            size="sm"
            id={props.id}
            onClick={toggleVisibility}
          >
            cancel
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
