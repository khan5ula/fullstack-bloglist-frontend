import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()

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

  return (
    <div>
      {title()}
      {url()}
      {likes()}
      {userInfo()}
      {deleteButton()}
    </div>
  )
}

export default Blog
