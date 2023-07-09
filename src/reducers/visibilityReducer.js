import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      return !state
    },
  },
})

export const { toggleVisibility } = visibilitySlice.actions

export const setVisibility = () => {
  return (dispatch, getState) => {
    dispatch(toggleVisibility())
  }
}

export default visibilitySlice.reducer
