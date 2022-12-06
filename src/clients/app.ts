import { io, Socket } from "socket.io-client";

const socket = io(`ws://localhost:3000`);

 
socket.emit('Hi','socket.io-client'); 
 
socket.on("hello", (arg) => {
    console.log("Hello "+ arg+ " Copy that !!!"); // world
});
