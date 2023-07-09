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
        header="Create a new blog"
        buttonLabel="Get started"
        ref={blogFormRef}
        id="create-new-blog-button"
      >
        <BlogForm />
      </Togglable>
      <Table bordered style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>
              <h2>Blogs</h2>
            </th>
            <th>Posted by</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {`🧑🏼‍💼 `}
                {blog.user.name}{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
