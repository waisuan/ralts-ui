import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ChatState {
  messages: string[],
  connected: boolean,
  isConnecting: boolean,
}

// Define the initial state using that type
const initialState: ChatState = {
  messages: [],
  connected: false,
  isConnecting: false,
}

export const chatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initConnection: (state => {
      state.isConnecting = true;
    }),
    setConnState:  ((state, action) => {
      state.isConnecting = false;
      state.connected = action.payload;
    }),
    receiveAllMessages: ((state, action) => {
      state.messages = [action.payload];
    }),
  },
})

export const chatSliceActions = chatSlice.actions

export const getMessages = (state: RootState) => state.chat.messages

export default chatSlice.reducer