import React, { useState } from 'react'
import BlogDeleter from './BlogDeleter'
import BlogLiker from './BlogLiker'

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
      {console.log(`DEBUG IN BLOG: RENDERING TITLE: ${blog.title} AND AUTHOR: ${blog.author}`)}
      {blog.title}{', '}{blog.author}
      {' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
    </div>
  );

  const url = () => (
    <div className='blogUrl'>
      {console.log(`DEBUG IN BLOG: RENDERING URL: ${blog.url}`)}
      <a href={blog.url}>{blog.url}</a><br /></div>
  );

  const userInfo = () => (
    /* Renders emoji and user name */
    <div>
      {console.log(`DEBUG IN BLOG: RENDERING USERNAME: ${blog.user.name}`)}
      {'\u{1F464}'}{blog.user.name} <br /></div>
  )

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
          <BlogLiker
            blog={blog}
            setNotificationMessage={setNotificationMessage}
            setNotificationType={setNotificationType}
            blogs={blogs}
            setBlogs={setBlogs}
          />

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
