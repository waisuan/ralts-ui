
import { Middleware } from 'redux'
import { chatSliceActions } from './chatSlice';
 
const WS_URL = 'ws://localhost:8001/ws';

const chatMiddleware: Middleware = store => {
  let socket: WebSocket;

  return next => action => {
    if (chatSliceActions.initConnection.match(action)) {
      socket = new WebSocket(WS_URL);
 
      socket.onopen = () => {
        console.log("I'm alive!");
        chatSliceActions.setConnState(true);
      };

      socket.onerror = () => {
        chatSliceActions.setConnState(false);
      };

      // socket.onclose

      socket.onmessage = (e) => {
        console.log(e.data);
        store.dispatch(chatSliceActions.receiveAllMessages(e.data));
      };
    }
 
    next(action);
  }
}
 
export default chatMiddleware;