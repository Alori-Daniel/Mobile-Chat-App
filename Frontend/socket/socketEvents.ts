import { getSocket } from "./socket";

export const testSocket = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }
  //   console.log("Socke", socket.emit);

  if (off) {
    // turn off listing to this event
    socket.off("testSocket", payload);
  } else if (typeof payload === "function") {
    // turn on listing to this event
    socket.on("testSocket", payload); //payload as callback for this event
  } else {
    socket.emit("testSocket", payload); //payload as data for this event
  }
};

export const updateProfile = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }
  //   console.log("Socke", socket.emit);

  if (off) {
    // turn off listing to this event
    socket.off("updateProfile", payload);
  } else if (typeof payload === "function") {
    // turn on listing to this event
    socket.on("updateProfile", payload); //payload as callback for this event
  } else {
    socket.emit("updateProfile", payload); //payload as data for this event
  }
};
