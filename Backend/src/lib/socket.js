const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        credentials: true,
    }
}) 
//This function should return socket.id of current user
// export function getRecieverSocketid (userId){
//     return socket.id;
// }

io.on("connection", (socket) => {
    console.log("A use Connected", socket.id);

    socket.on("disconnect", () => {
        console.log("A user is disconnected", socket.id);
    })
})

module.exports = { io, app, server };

// import { Server } from 'socket.io';
// import http from 'http';
// import express from 'express';

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// });

// // Map to keep track of user IDs and their socket IDs
// const userSocketMap = new Map();

// io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     // Listen for setup event from client containing user ID
//     socket.on('setup', (userId) => {
//         userSocketMap.set(userId, socket.id);
//         console.log(`User ${userId} connected with socket ID ${socket.id}`);
//     });

//     socket.on('disconnect', () => {
//         // Remove user from map on disconnect
//         const entries = Array.from(userSocketMap.entries());
//         const [key] = entries.find(([k, v]) => v === socket.id) || [];
//         if (key) {
//             userSocketMap.delete(key);
//             console.log(`User ${key} disconnected`);
//         }
//         console.log("A user disconnected", socket.id);
//     });
// });

// // Function to get receiver's socket ID
// export function getRecieverSocketid(userId) {
//     return userSocketMap.get(userId);
// }

// export { io, app, server };
