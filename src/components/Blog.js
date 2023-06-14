import React, { useState } from 'react'
import BasicButton from './BasicButton'

const Blog = ({ blog }) => {
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
        event={() => console.log('Like feature is not yet implemented')}
        text={'like'}
      />
    </div>
  );

  const userInfo = () => (
    <div>{'\u{1F464}'}{blog.user.name} <br /></div>
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
          {likes()}

          { /* Render user who posted the blog */}
          {userInfo()}
        </>
      )}
    </div>
  )
}

export default Blog
