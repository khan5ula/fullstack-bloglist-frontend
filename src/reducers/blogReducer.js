import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
    try {
      const blogs = await blogService.getAll()
      dispatch(
        setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
      )
    } catch (error) {
      dispatch(
        setNotification(
          `error: could not retrieve blogs: ${error.response.data}`
        )
      )
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch(create(blog))
      dispatch(setBlogs(await blogService.getAll()))
      dispatch(setNotification(`a new blog ${newBlog.title} added`))
    } catch (error) {
      let errorMessage = 'blog could not be added'
      if (error.response && error.response.data) {
        const errorDataStr = JSON.stringify(error.response.data)
        errorMessage += ': minimum lenght of a field is 3 characters'
      }
      dispatch(setNotification(errorMessage))
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.createComment(id, { comment })
      dispatch(dispatch(setBlogs(await blogService.getAll())))
      dispatch(setNotification(`comment posted`))
    } catch (error) {
      dispatch(
        setNotification(
          `error: commenting failed: ${error.response.data.error}`
        )
      )
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      const blogToVote = blogs.find((n) => n.id === id)
      if (blogToVote) {
        blogToVote.likes++
      }
      await blogService.update(id, blogToVote)
      dispatch(like(id))
      dispatch(
        setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
      )
    } catch (error) {
      dispatch(setNotification(`error: like failed: ${error.response.data}`))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      const newBlogs = blogs.filter((blog) => blog.id !== id)
      await blogService.remove(id)
      dispatch(setBlogs(newBlogs))
      dispatch(setNotification(`blog removed`))
    } catch (error) {
      dispatch(
        setNotification(`error: blog deletion failed: ${error.response.data}`)
      )
    }
  }
}

export default blogSlice.reducer
