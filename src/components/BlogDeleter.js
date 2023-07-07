import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogDeleter = ({ user, blog, blogs, setBlogs }) => {
  const dispatch = useDispatch()

  const deleteButton = () => {
    /* Usernames must be unique, so comparison between usernames works */
    if (blog.user.username === user.username) {
      return <button onClick={handleDelete}>remove</button>
    }
    return null
  }

  const handleDelete = (event) => {
    const removedId = blog.id
    const removedTitle = blog.title
    event.preventDefault()

    if (
      window.confirm(`Are you sure you want to remove blog ${removedTitle}?`)
    ) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== removedId))
          dispatch(setNotification(`blog ${removedTitle} removed`, 5000))
        })

        /* Inform user of error */
        .catch((error) => {
          if (error.response.status === 401) {
            dispatch(
              setNotification(
                `deleting blog failed: not authorized to remove blog ${removedTitle}`,
                5000
              )
            )
          } else {
            dispatch(
              setNotification(
                `
                deleting blog failed: ${error.response.status} ${error}`,
                5000
              )
            )
          }
        })
    }
  }

  return deleteButton()
}

BlogDeleter.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDeleter
