import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'This blog title should be rendered in all cases',
    author: 'Mr. Testerson',
    url: 'www.testurl.net',
  }

  render(<Blog blog={blog} />)

  screen.getByText('This blog title should be rendered in all cases', { exact: false })
  screen.getByText('Mr. Testerson', { exact: false })
  const url = screen.queryByText('www.testurl.net')
  expect(url).toBeNull()
})

test('additional contents show after a click', async () => {

  const blog = {
    title: 'react tests',
    author: 'Mr. Testerson',
    url: 'www.testings.com',
    likes: '5',
    user: {
      name: 'Dummy',
      username: 'dummy'
    }
  }
  const container = render(<Blog blog={blog} user={'someuser'} />).container

  const user = userEvent.setup()
  const button = screen.getByText('show')

  await user.click(button)
  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('www.testings.com')
  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('Dummy')
})
