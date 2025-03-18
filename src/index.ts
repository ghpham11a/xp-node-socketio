import express, { Express } from "express";
import { createServer } from 'node:http';
import { DefaultEventsMap, Server, Socket } from 'socket.io';

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"],
    },
});
const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connect", (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    console.log(socket.handshake);

    io.emit("user connected", socket.id);

    socket.emit("welcome", 'Welcome to the chat!');

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server.listen(port, () => {
    console.log('server running at http://localhost:3000');
});