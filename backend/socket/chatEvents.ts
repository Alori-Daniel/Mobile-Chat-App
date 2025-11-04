import { Server as SocketIOServer, Socket } from "socket.io";
import Conversation from "../modals/Conversation";

export function registerChatEvents(io: SocketIOServer, socket: Socket) {
  socket.on("getConversation", async () => {
    try {
      const userId = socket.data.userId;
      if (!userId) {
        socket.emit("getConversation", {
          success: false,
          msg: "Unauthorized",
        });
        return;
      }
      //fina all conversations where user is a participant
      const conversations = await Conversation.find({
        participants: userId,
      })
        .sort({
          updatedAt: -1,
        })
        .populate({
          path: "lastMessage",
          select: "content senderId attachment createdAt",
        })
        .populate({
          path: "participants",
          select: "name avatar email",
        })
        .lean();

      socket.emit("getConversation", {
        success: true,
        data: conversations,
      });
    } catch (error) {
      console.log("getConversation error", error);
      socket.emit("getConversation", {
        success: false,
        msg: "Failed to get conversation",
      });
    }
  });

  socket.on("newConversation", async (data) => {
    console.log("newConversation event", data);
    try {
      if (data.type == "direct") {
        // Check if already exsists
        const existingConversation = await Conversation.findOne({
          type: "direct",
          participants: {
            $all: data.participants,
            $size: 2,
          },
        })
          .populate({
            path: "participants",
            select: "name avatar email",
          })
          .lean();
        if (existingConversation) {
          socket.emit("newConversation", {
            success: true,
            data: { ...existingConversation, isNew: false },
          });
          return;
        }
      }
      // Create new conversation
      const conversation = await Conversation.create({
        type: data.type,
        participants: data.participants,
        name: data.name || "",
        avatar: data.avatar || "",
        createdBy: socket.data.userId,
      });

      // Get all connected Sockets
      const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
        (socket) => data.participants.includes(socket.data.userId)
      );

      //join the conversation by all online participants

      connectedSockets.forEach((participantSocket) =>
        participantSocket.join(conversation._id.toString())
      );

      // send conversation data back (populated)
      const populatedConversation = await Conversation.findById(
        conversation._id
      )
        .populate({
          path: "participants",
          select: "name avatar email",
        })
        .lean();
      if (!populatedConversation) {
        throw new Error("Failed to populate conversation");
      }
      io.to(conversation._id.toString()).emit("newConversation", {
        success: true,
        data: { ...populatedConversation, isNew: true },
      });
    } catch (error) {
      console.log("newConversation error", error);
      socket.emit("newConversation", {
        success: false,
        msg: "Failed to create conversation",
      });
    }
  });
}
