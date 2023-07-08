import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
  },
})

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(set(initialState))
    }, 5000)
  }
}

export const { set } = notificationSlice.actions
export default notificationSlice.reducer
