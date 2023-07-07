import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label className="formLabel" htmlFor="title">
        title:
      </label>
      <input
        id="title"
        value={blog.title}
        onChange={handleTitleChange}
        placeholder="blog title"
      />
      <br />
      <label className="formLabel" htmlFor="title">
        author:
      </label>
      <input
        id="author"
        value={blog.author}
        onChange={handleAuthorChange}
        placeholder="blog author"
      />
      <br />
      <label className="formLabel" htmlFor="title">
        url:
      </label>
      <input
        id="url"
        value={blog.url}
        onChange={handleUrlChange}
        placeholder="blog url"
      />
      <br />
      <br />
      <button id="create-blog-button" type="submit">
        create
      </button>
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

export default BlogForm
