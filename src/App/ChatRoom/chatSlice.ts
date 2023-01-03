import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface Message {
  userId: string,
  text: string,
  createdAt: string
}

// Define a type for the slice state
interface ChatState {
  messages: Message[],
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
    receiveMessage: ((state, action) => {
      console.log(action.payload);
      const payload = JSON.parse(action.payload);
      state.messages.push(payload);
    }),
    sendMessage: ((state, action) => {
      // state.messages.push(action.payload);
    }),
  },
})

export const chatSliceActions = chatSlice.actions

export const getMessages = (state: RootState) => state.chat.messages

export default chatSlice.reducer