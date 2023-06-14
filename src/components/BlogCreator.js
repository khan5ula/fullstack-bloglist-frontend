import { useState } from 'react'
import blogService from '../services/blogs'

const BlogCreator = ({ blogs, setBlogs, notificationMessage, setNotificationMessage, notificationType, setNotificationType }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
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

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    blogService
      .create(newBlog)
      .then(newBlog => {
        console.log(`Adding a blog: ${newBlog.title}`)
        setBlogs(blogs.concat(newBlog))
        setBlog({ title: '', author: '', url: '' })

        /* Inform user of successful operation */
        setNotificationType('success')
        setNotificationMessage(`a new blog ${blog.title} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

      /* Inform user of error */
      .catch(error => {
        console.error(`Error occured while adding the blog: ${error}`);
        setNotificationType('error')
        setNotificationMessage('new blog could not be added')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label className="formLabel" htmlFor="title">title:</label>
      <input
        id='title'
        value={blog.title}
        onChange={handleTitleChange}
      />
      <br />
      <label className="formLabel" htmlFor="title">author:</label>
      <input
        id='author'
        value={blog.author}
        onChange={handleAuthorChange}
      />
      <br />
      <label className="formLabel" htmlFor="title">url:</label>
      <input
        id='url'
        value={blog.url}
        onChange={handleUrlChange}
      />
      <br /><br />
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>create new</h2>
      {blogForm()}
      <br />
    </div>
  )
}

export default BlogCreator