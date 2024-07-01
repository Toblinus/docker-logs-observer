import { createServer } from "node:http";
import { Server } from "socket.io";
import { registryTransport, addEventListener, hasBucket } from "../services/buckets";

const PORT = +(process.env.WEB_SOCKET_PORT || 0) || 3050;

export const startWebSocket = () => {
  const http = createServer();
  const io = new Server(http, {
    cors: {
      origin: '*'
    } 
  });

  registryTransport((bucket, msg) => {
    io.to(bucket).emit("log", msg);
  });

  addEventListener("remove", ({ name }) => {
    io.to(name).emit("bucket-removed");
    io.to(name).disconnectSockets(true);
  });

  io.on('connection', (socket) => {
    const { bucket } = socket.handshake.auth;

    if (!bucket || !hasBucket(bucket)) {
      socket.disconnect(true);
    }

    socket.join(bucket);
  })

  http.listen(PORT, () => {
    console.log('websocket server running');
  });
};
