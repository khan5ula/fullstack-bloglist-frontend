import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  currentUser: null,
  allUsers: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { setCurrentUser, setAllUsers } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(setCurrentUser(user))
    if (user) {
      blogService.setToken(user.token)
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch(setAllUsers(users))
    } catch (error) {
      dispatch(setNotification(`failed to get all users: ${error}`))
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(setNotification(`${user.username} logged in`))
    } catch (error) {
      dispatch(setNotification(`login failed: ${error.response.data.error}`))
    }
  }
}

export default userSlice.reducer
