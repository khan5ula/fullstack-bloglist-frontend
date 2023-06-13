import { useState } from 'react'
import blogService from '../services/blogs'

const BlogCreator = ({ blogs, setBlogs }) => {
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
      })
      .catch(error => {
        /* Future error handling block */
        console.error(`Error occured while adding the blog: ${error}`);
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label htmlFor="title">title:</label>
      <input
        id='title'
        value={blog.title}
        onChange={handleTitleChange}
      />
      <br />
      <label htmlFor="title">author:</label>
      <input
        id='author'
        value={blog.author}
        onChange={handleAuthorChange}
      />
      <br />
      <label htmlFor="title">url:</label>
      <input
        id='url'
        value={blog.url}
        onChange={handleUrlChange}
      />
      <br />
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