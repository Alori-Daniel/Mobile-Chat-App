import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server as SocketIOServer, Socket } from "socket.io";
import { registerUserEvents } from "./userEvents";

dotenv.config();

export function initializeSocketIO(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  }); //socket io server instant

  //auth middleware

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: no token provided"));
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Authentication error: no token provided"));
        }

        //attach user to socket
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
      }
    );
  });
  //   when socket connects,
  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    // console.log(socket.data);
    console.log(`a user connected ${userId}, UserName:${socket.data.name}`);

    // register events
    registerUserEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`user disconnected ${userId}`);
    });
  });
  return io;
}
