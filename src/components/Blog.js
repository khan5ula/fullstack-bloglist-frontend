import React, { useState } from 'react'
import BasicButton from './BasicButton'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotificationMessage, setNotificationType, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const title = () => (
    <div className='blogTitle'>
      {blog.title}{', '}{blog.author}
      {' '}
      <BasicButton
        event={toggleVisibility}
        text={visible ? 'hide' : 'show'}
      />
    </div>
  );

  const url = () => (
    <div className='blogUrl'><a href={blog.url}>{blog.url}</a><br /></div>
  );

  const likes = () => (
    <div>
      likes: {blog.likes}{' '}
      <BasicButton
        event={handleLike}
        text={'like'}
      />
    </div>
  );

  const userInfo = () => (
    <div>{'\u{1F464}'}{blog.user.name} <br /></div>
  )

  const handleDelete = (event) => {
    const removedId = blog.id
    const removedTitle = blog.title
    event.preventDefault()

    if (window.confirm(`Are you sure you want to remove blog ${removedTitle}?`)) {
      blogService
        .remove(blog.id)
        .then(response => {
          setBlogs(blogs.filter(blog => blog.id !== removedId))

          /* Inform user of successful operation */
          setNotificationType('success')
          setNotificationMessage(`blog ${removedTitle} removed`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

        /* Inform user of error */
        .catch(error => {
          setNotificationType('error')
          if (error.response.status === 401) {
            setNotificationMessage(`deleting blog failed: not authorized to remove blog ${removedTitle}`)
          } else {
            setNotificationMessage(`deleting blog failed: ${error.response.status} ${error}`)
          }

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

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
          <BasicButton
            event={handleDelete}
            text={'remove'}
          />
        </>
      )}
    </div>
  )
}

export default Blog
