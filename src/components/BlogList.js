import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <Togglable
        buttonLabel="create new blog"
        ref={blogFormRef}
        id="create-new-blog-button"
      >
        <BlogForm />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
