
import { Middleware } from 'redux'
import { chatSliceActions } from './chatSlice';
 
const WS_URL = 'ws://localhost:8001/ws';

const chatMiddleware: Middleware = store => {
  let socket = new WebSocket(WS_URL);

  return next => action => {
    if (chatSliceActions.initConnection.match(action)) { 
      socket.onopen = () => {
        console.log("I'm alive!");
        chatSliceActions.setConnState(true);
      };

      socket.onerror = () => {
        chatSliceActions.setConnState(false);
      };

      // socket.onclose

      socket.onmessage = (e) => {
        store.dispatch(chatSliceActions.receiveMessage(e.data));
      };
    } else if(chatSliceActions.sendMessage.match(action)) {
      const payload = JSON.stringify({
        userId: Math.floor(Math.random() * 2) === 0 ? "EvanSia" : "Rando",
        message: action.payload
      });
      socket.send(payload);
    }
 
    next(action);
  }
}
 
export default chatMiddleware;