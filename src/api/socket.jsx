import {io} from "socket.io-client"
const socket = io("http://43.203.78.52:3030/chat", { transports: ["websocket"] });
export default socket