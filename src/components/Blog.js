import React, { useState } from 'react'
import {
  Button,
  Card,
  CloseButton,
  Container,
  Form,
  Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commentBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.currentUser)
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  if (!blog) {
    return null
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const title = () => (
    <div className="blogTitle">
      <h2>{blog.title}</h2>
      {`Author: ${blog.author}`}
    </div>
  )

  const url = () => (
    <div>
      Find out more: <a href={blog.url}>{blog.url}</a>
    </div>
  )

  const userInfo = () => (
    <div>
      Posted by {`🧑🏼‍💼`}{' '}
      {blog.user.username === user.username ? 'You' : blog.user.name}
    </div>
  )

  const likes = () => (
    <div>
      Likes: {blog.likes}{' '}
      <Container style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Button
          variant="outline-success"
          size="sm"
          id="like-button"
          onClick={() => handleLike(blog)}
        >
          {`like 👍`}
        </Button>
      </Container>
    </div>
  )

  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <Button variant="danger" size="sm" onClick={() => setShow(!show)}>
          delete blog
        </Button>
      )
    }
    return null
  }

  const deleteModal = () => {
    if (!show) {
      return null
    }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Confirmation required</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`Do you want to delete blog: ${blog.title}?`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleBlogDeletion}>
              Confirm delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const handleBlogDeletion = () => {
    dispatch(deleteBlog(blog.id))
    setShow(false)
    navigate('/blogs')
  }

  const addComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, newComment))
    setNewComment('')
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const commentForm = () => {
    return (
      <div>
        <Form onSubmit={addComment}>
          <Form.Control
            placeholder="add..."
            style={{ marginBottom: '10px' }}
            as="textarea"
            value={newComment}
            onChange={handleCommentChange}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outline-primary"
              size="sm"
              id="create-blog-button"
              type="submit"
            >
              add comment
            </Button>
            {deleteButton()}
          </div>
        </Form>
      </div>
    )
  }

  const comments = () => {
    const comments = blog.comments
    if (!comments) {
      commentForm()
    }
    return (
      <div>
        <h2>Comments</h2>

        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>{comment.text}</li>
          ))}
        </ul>
        {commentForm()}
      </div>
    )
  }

  return (
    <div>
      {deleteModal()}
      <Card style={{ marginTop: '20px' }}>
        <Card.Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Blog details</span>
          {<CloseButton onClick={() => navigate('/')} />}
        </Card.Header>
        <Card.Body>
          {title()}
          {url()}
          {userInfo()}
          {likes()}
          {comments()}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Blog
