const express = require("express");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EXPRESS Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from EXPRESS server!");
});

// Create a websocket server and run it on port 8181
const wsServer = new WebSocket.Server({ port: 8181 });

// listen for new websocket connections
wsServer.on("connection", function connection(ws) {
  console.log("wsServer connected!");
  // listen for messages sent by client
  ws.on("message", function incoming(message) {
    console.log(message.toString());
  });

  //   ws.send("This is a message, אחלה");
});
