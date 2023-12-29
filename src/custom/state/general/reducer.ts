import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'

// Actions and Reducers

const generalStateSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setPdfUrl(state, action: PayloadAction<string>) {
      state.pdfUrl = action.payload
    },
    setMargins(state, action: PayloadAction<{ top: number, left: number }>) {
      state.margins = action.payload
    },
    reset() {
      return {
        ...initialState
      }
    }
  }
})

export default generalStateSlice