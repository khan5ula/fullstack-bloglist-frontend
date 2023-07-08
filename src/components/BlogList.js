import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

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
        <Blog key={blog.id} blog={blog} blogs={blogs} />
      ))}{' '}
    </div>
  )
}

export default BlogList
