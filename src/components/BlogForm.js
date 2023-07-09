import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Container, Form, Image, Row, Col, Card } from 'react-bootstrap'
import { setVisibility } from '../reducers/visibilityReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
  })

  const handleTitleChange = (event) => {
    setBlog({ ...blog, title: event.target.value })
  }

  const handleAuthorChange = (event) => {
    setBlog({ ...blog, author: event.target.value })
  }

  const handleUrlChange = (event) => {
    setBlog({ ...blog, url: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(createBlog(blog))
    setBlog({ title: '', author: '', url: '' })
    dispatch(setVisibility())
  }

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col md={8}>
              <Form onSubmit={addBlog}>
                <Form.Group>
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. My awesome blog!"
                    value={blog.title}
                    onChange={handleTitleChange}
                    style={{ marginBottom: '10px', width: '100%' }}
                  />
                  <Form.Label>Author:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. Mr. Firstname Lastname"
                    value={blog.author}
                    onChange={handleAuthorChange}
                    style={{ marginBottom: '10px', width: '100%' }}
                  />
                  <Form.Label>URL:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. http://www.awesome.net"
                    value={blog.url}
                    onChange={handleUrlChange}
                    style={{ marginBottom: '15px', width: '100%' }}
                  />
                </Form.Group>
                <Button variant="success" size="sm" type="submit">
                  create
                </Button>
              </Form>
            </Col>
            <Col md={4}>
              <Image
                src="/undraw_Add_notes_re_ln36.png"
                fluid
                onDragStart={(event) => event.preventDefault()}
                style={{ marginTop: '20%' }}
              />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default BlogForm
