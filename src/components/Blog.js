import React, { useState } from 'react'
import BasicButton from './BasicButton'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div className='blogTitle'>
        {blog.title}
        {' '}
        <BasicButton 
          event={toggleVisibility} 
          text={visible ? 'hide' : 'show'}
        />
      </div>

      {/* Show blog details if visibility is toggled */}
      {visible && (
        <>
          <div className='blogUrl'><a href={blog.url}>{blog.url}</a><br /></div>
          likes: {blog.likes} <BasicButton 
          event={() => console.log('Like feature is not yet implemented')} 
          text={'like'}
        /><br />
          {'\u{1F464}'}{blog.author} <br />
        </>
      )}
    </div>
  )
}

export default Blog
