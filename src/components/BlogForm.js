import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = () => {
  // TODO: After moving visibility to reducer, use dispatch to toggle visibility off after a blog has been created
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: user,
    }

    dispatch(createBlog(blog))
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog Title"
            value={blog.title}
            onChange={handleTitleChange}
            style={{ marginBottom: '10px', width: '50%' }}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog Author"
            value={blog.author}
            onChange={handleAuthorChange}
            style={{ marginBottom: '10px', width: '50%' }}
          />
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog URL"
            value={blog.url}
            onChange={handleUrlChange}
            style={{ marginBottom: '15px', width: '50%' }}
          />
        </Form.Group>
        <Button variant="success" size="sm" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
