import React, { useState } from 'react'
import BasicButton from './BasicButton'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>

      { /* Render blog title */ }
      <div className='blogTitle'>
        {blog.title}{', '}{blog.author}
        {' '}
        <BasicButton 
          event={toggleVisibility} 
          text={visible ? 'hide' : 'show'}
        />
      </div>

      { /* Show blog details if visibility is toggled */}
      {visible && (
        <>
          { /* Render blog url */ }
          <div className='blogUrl'><a href={blog.url}>{blog.url}</a><br /></div>

          { /* Render blog likes */ }
          likes: {blog.likes} <BasicButton 
          event={() => console.log('Like feature is not yet implemented')} 
          text={'like'}
        /><br />

          { /* Render user who posted the blog */}
          {'\u{1F464}'}{blog.user.name} <br />
        </>
      )}
    </div>
  )
}

export default Blog
