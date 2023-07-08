import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.currentUser)
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <br />
    </div>
  )

  const userInfo = () => (
    <div>
      {'\u{1F464}'} {blog.user.name}
      <p style={{ marginTop: '10px' }}>{deleteButton()}</p>
      <hr />
    </div>
  )

  const likes = () => (
    <div>
      Likes: {blog.likes}{' '}
      <p style={{ marginTop: '5px' }}>
        <Button
          variant="success"
          size="sm"
          id="like-button"
          onClick={() => handleLike(blog)}
        >
          like
        </Button>
      </p>
    </div>
  )

  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <Button variant="danger" size="sm" onClick={handleDelete}>
          remove
        </Button>
      )
    }
    return null
  }

  const handleDelete = (event) => {
    const removedTitle = blog.title
    event.preventDefault()

    if (
      window.confirm(`Are you sure you want to remove blog ${removedTitle}?`)
    ) {
      dispatch(deleteBlog(blog.id))
    }
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
            style={{ marginBottom: '10px', width: '50%' }}
            as="textarea"
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button
            variant="primary"
            size="sm"
            id="create-blog-button"
            type="submit"
          >
            add comment
          </Button>
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
      <hr />
      {title()}
      {url()}
      {likes()}
      {userInfo()}
      {comments()}
      <p style={{ marginTop: '20px' }}>
        <Button
          variant="outline-primary"
          size="sm"
          id="back-button"
          style={{ display: 'inline' }}
          onClick={() => navigate('/')}
        >
          ⬅️ back to blogs
        </Button>
      </p>
    </div>
  )
}

export default Blog
