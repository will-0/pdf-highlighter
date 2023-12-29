import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHighlight } from 'react-pdf-highlighter';
import initialState from './initialState'
import { appContent } from './types'

// Actions and Reducers

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setAppContent: (_: appContent, action: PayloadAction<appContent>) => {
        return action.payload;
      },
    addHighlight: (state: appContent, action: PayloadAction<IHighlight>) => {
      state.highlights.push(action.payload);
    },
    updateHighlightByID: (state: appContent, action: PayloadAction<{id: string, highlight: IHighlight}>) => {
      const highlight = action.payload.highlight;
      const index = state.highlights.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.highlights[index] = highlight;
      }
    },
    reset() {
      return {
        ...initialState
      }
    }
  },
});

export default contentSlice