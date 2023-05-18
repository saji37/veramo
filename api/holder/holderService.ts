import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import express from 'express'

const sndVc = () => {


const app = express();

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Connection established on ${socket.id}`)

    socket.on("join_room",(data) => {
        socket.join(data)
        console.log(data)
        
    })

    socket.on("send_message",(data) => {
        socket.to(data.room).emit("recieve_message",data)
    })
    socket.on("disconnect",() =>{
        console.log("User Disconnected", socket.id)
    })
})

}