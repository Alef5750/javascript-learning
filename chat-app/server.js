const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Create HTTP server by passing the Express app
const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`EXPRESS Server running on port ${PORT}`);
});

// NOT RELEVANT SINCE SERVING ONLY STATIC FILES
// app.get("/", (req, res) => {
//   res.send("Hello from EXPRESS server!");
// });

// Integrate  WebSocket with the HTTP server (single port)
const wsServer = new WebSocket.Server({ server });

// listen for new websocket connections
wsServer.on("connection", function connection(ws) {
  console.log("wsServer connected!");
  // listen for messages sent by client
  ws.on("message", function incoming(message) {
    console.log(message.toString());
    //send the message back to client
    ws.send(`Echo: ${message}`);
  });

  ws.send("This is a message, אחלה");
});
