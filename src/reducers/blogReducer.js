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
    like: (state, action) => {
      const id = action.payload
      const blogToLike = state.find((n) => n.id === id)
      if (blogToLike) {
        blogToLike.likes++
      }
    },
    setBlogs: (state, action) => {
      return action.payload
    },
  },
})

export const { create, like, setBlogs } = blogSlice.actions

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
    dispatch(like(id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    await blogService.remove(id)
    dispatch(setBlogs(newBlogs))
  }
}

export default blogSlice.reducer
