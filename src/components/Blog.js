import React, { useState } from 'react'
import blogService from '../services/blogs'
import BlogDeleter from './BlogDeleter'

const Blog = ({
  blog,
  setNotificationMessage,
  setNotificationType,
  setBlogs,
  blogs,
  user
}) => {

  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const title = () => (
    <div className='blogTitle'>
      {blog.title}{', '}{blog.author}
      {' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
    </div>
  );

  const url = () => (
    <div className='blogUrl'><a href={blog.url}>{blog.url}</a><br /></div>
  );

  const likes = () => (
    <div>
      likes: {blog.likes}{' '}
      <button onClick={handleLike}>like</button>
    </div>
  );

  const userInfo = () => (
    <div>{'\u{1F464}'}{blog.user.name} <br /></div>
  )

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

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
    <div className='blog'>

      { /* Render blog title */}
      {title()}

      { /* Show blog details if visibility is toggled */}
      {visible && (
        <>
          { /* Render blog url */}
          {url()}

          { /* Render blog likes */}
          {likes()}

          { /* Render user who posted the blog */}
          {userInfo()}

          { /* Render the delete button (conditionally) */}
          <BlogDeleter
              user={user}
              blog={blog}
              blogs={blogs}
              setNotificationType={setNotificationType}
              setNotificationMessage={setNotificationMessage}
              setBlogs={setBlogs}
          />
        </>
      )}
    </div>
  )
}

export default Blog
