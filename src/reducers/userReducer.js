import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
  },
})

export const { set } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user))
    blogService.setToken(user.token)
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      dispatch(set(user))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      console.log(`user to local storage: ${JSON.stringify(user)}`)
      dispatch(setNotification(`${user.username} logged in`, 5000))
    } catch (error) {
      dispatch(
        setNotification(`login failed: ${error.response.data.error}`, 5000)
      )
    }
  }
}

export default userSlice.reducer
