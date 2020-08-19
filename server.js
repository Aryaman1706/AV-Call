const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

// Socket.io
io.on("connection", (socket) => {
  socket.on("let_me_in", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("i_am_here", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("bye_bye", userId);
    });
  });
});
// -->

server.listen(5000);
