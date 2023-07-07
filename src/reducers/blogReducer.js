import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    create: (state, action) => {
      state.push(action.payload)
    },
    increment: (state, action) => {
      /*const id = action.payload
      const anecdoteToVote = state.find((n) => n.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }*/
      console.log(
        'liking is not yet implemented, but here is an imaginary like!'
      )
    },
    setBlogs: (state, action) => {
      return action.payload
    },
  },
})

export const { create, increment, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(create(blog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToVote = blogs.find((n) => n.id === id)
    if (blogToVote) {
      blogToVote.likes++
    }
    await blogService.update(id, blogToVote)
    dispatch(increment(id))
  }
}

export default blogSlice.reducer
