/* eslint-disable no-console */
import { Server } from "socket.io";

import { server } from "../server";

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message-created", (data) => {
    // one to one comunication
    // socket.emit("message-received", { received: true, data });
    socket.broadcast.emit("message-received", { received: true, data });
    // Emit to all users
    // io.emit("message-received", { received: true, data });
  });

  socket.on("join-user-to-room", ({ roomId }) => {
    console.log("roomId", roomId);
    socket.join(roomId);

    socket.to(roomId).emit("user-is-joined", socket.id);
  });
});
