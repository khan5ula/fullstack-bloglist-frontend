import blogService from '../services/blogs'

const BlogLiker = ({
  blog,
  setNotificationMessage,
  setNotificationType,
  blogs,
  setBlogs
}) => {

  const likes = () => (
    <div>
      likes: {blog.likes}{' '}
      <button onClick={handleLike}>like</button>
    </div>
  );

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = blog
    updatedBlog.likes = blog.likes + 1

    blogService
      .update(blog.id, updatedBlog)
      .then(updatedBlog => {
        const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
        setBlogs(updatedBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes))

        /* Inform user of successful operation */
        setNotificationType('success')
        setNotificationMessage(`liked blog: ${blog.title}, ${blog.author}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

      /* Inform user of error */
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(`updating blog likes failed: ${error}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  return (
    likes()
  )
}

export default BlogLiker