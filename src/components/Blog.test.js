import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This blog title should be rendered in all cases',
    author: 'Mr. Testerson',
    url: 'www.testurl.net',
  }

  render(<Blog blog={blog} />)

  screen.debug()

  screen.findByText('This blog title should be rendered in all cases')
  screen.findByText('Mr. Testerson')
  const url = screen.queryByText('www.testurl.net')
  expect(url).toBeNull()
})