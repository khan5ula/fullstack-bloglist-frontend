import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

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
      {blog.title}
      {', '}
      {blog.author}{' '}
    </div>
  )

  const url = () => (
    <div className="blogUrl">
      <a href={blog.url}>{blog.url}</a>
      <br />
    </div>
  )

  const userInfo = () => (
    <div>
      {'\u{1F464}'} {blog.user.name} <br />
    </div>
  )

  const likes = () => (
    <div>
      likes: {blog.likes}{' '}
      <button id="like-button" onClick={() => handleLike(blog)}>
        like
      </button>
    </div>
  )

  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return <button onClick={handleDelete}>remove</button>
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
        <form onSubmit={addComment}>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
          />
          <button id="create-blog-button" type="submit">
            add comment
          </button>
        </form>
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
        <h2>comments</h2>
        {commentForm()}
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {title()}
      {url()}
      {likes()}
      {userInfo()}
      {comments()}
      <button
        id="back-button"
        style={{ display: 'inline' }}
        onClick={() => navigate('/')}
      >
        ⬅️ back to blogs
      </button>
      {deleteButton()}
    </div>
  )
}

export default Blog
