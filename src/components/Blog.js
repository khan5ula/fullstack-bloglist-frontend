const Blog = ({ blog }) => (
    <div className='blog'>
      <div className='blogTitle'>{blog.title}</div>
      {blog.url} <br />
      likes {blog.likes} <br />
      {blog.author} <br />
    </div>
  )

export default Blog