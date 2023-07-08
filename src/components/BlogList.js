import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <div style={{ marginTop: '20px' }}>
      <Togglable
        buttonLabel="create new blog"
        ref={blogFormRef}
        id="create-new-blog-button"
      >
        <BlogForm />
      </Togglable>
      <h2 style={{ marginTop: '20px' }}>blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
