import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const title = () => (
    <div className="blogTitle">
      {blog.title}
      {', '}
      {blog.author}{' '}
      <button id="show-button" onClick={toggleVisibility}>
        {visible ? 'hide' : 'show'}
      </button>
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
      dispatch(setNotification(`blog ${removedTitle} removed`, 5000))
    }
  }

  return (
    <div className={'blog'}>
      {title()}
      {visible && (
        <>
          {url()}
          {likes()}
          {userInfo()}
          {deleteButton()}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
