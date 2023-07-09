import { Button, Card, CloseButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setVisibility } from '../reducers/visibilityReducer'

const Togglable = (props) => {
  const visible = useSelector((state) => state.visibility)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    dispatch(setVisibility())
  }

  return (
    <Card className="mt-4">
      <Card.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{props.header}</span>
        {visible && <CloseButton onClick={toggleVisibility} />}
      </Card.Header>
      <Card.Body>
        <div className={visible ? 'd-none' : ''}>
          <Button variant="success" size="sm" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
        <div className={visible ? '' : 'd-none'}>{props.children}</div>
      </Card.Body>
    </Card>
  )
}

export default Togglable
