const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(cors());

// Socket.io
io.on("connection", (socket) => {
  socket.on("let_me_in", (roomId, userId) => {
    console.log("let me in", userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("i_am_here", userId);

    socket.on("disconnect", () => {
      console.log("disconnect");
      socket.to(roomId).broadcast.emit("bye_bye", userId);
    });
  });
});
// -->

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
