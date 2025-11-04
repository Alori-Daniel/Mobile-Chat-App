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

export const getContacts = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }
  //   console.log("Socke", socket.emit);

  if (off) {
    // turn off listing to this event
    socket.off("getContacts", payload);
  } else if (typeof payload === "function") {
    // turn on listing to this event
    socket.on("getContacts", payload); //payload as callback for this event
  } else {
    socket.emit("getContacts", payload); //payload as data for this event
  }
};

export const newConversation = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }
  //   console.log("Socke", socket.emit);

  if (off) {
    // turn off listing to this event
    socket.off("newConversation", payload);
  } else if (typeof payload === "function") {
    // turn on listing to this event
    socket.on("newConversation", payload); //payload as callback for this event
  } else {
    socket.emit("newConversation", payload); //payload as data for this event
  }
};

export const getConversation = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }
  //   console.log("Socke", socket.emit);

  if (off) {
    // turn off listing to this event
    socket.off("getConversation", payload);
  } else if (typeof payload === "function") {
    // turn on listing to this event
    socket.on("getConversation", payload); //payload as callback for this event
  } else {
    socket.emit("getConversation", payload); //payload as data for this event
  }
};
