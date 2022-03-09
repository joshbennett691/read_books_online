import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import RequestService from "../../services/request.service";
import ChatService from "../../services/chat.service";
import axios from "axios";
import io from "socket.io-client";
import authService from "../../services/auth.service";

const socket = io.connect("http://localhost:8080");

const Chat = (props) => {
  const initialRequestState = {
    id: null,
    issuer: {},
    book: {},
    employee: {},
    authorizer: {},
    state: {},
    chat: {},
  };
  const initialChatState = {
    id: null,
    issuer: {},
    employee: {},
    messages: [],
  };
  const [currentRequest, setCurrentRequest] = useState(initialRequestState);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listOfMessages, setListOfMessages] = useState("");
  const [currentChat, setCurrentChat] = useState([]);

  const [issuer, setIssuer] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [username, setUsername] = useState(
    AuthService.getCurrentUser().username
  );
  const [employeeName, setEmployeeName] = useState("0ssdd0");
  const [room, setRoom] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    console.log(props.match.params.id);
    setRoom(props.match.params.id);
    console.log(AuthService.getCurrentUser().username);
    retrieveRequest(props.match.params.id);
    updateRequestWithChat(currentRequest);
    joinRoom(room, currentRequest);

    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [props.match.params.id, room]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessages((list) => [...list, data]);
  //     console.log(data);
  //   });
  // }, [socket, room]);

  const retrieveRequest = async (id) => {
    await RequestService.getRequest(id).then((response) => {
      setCurrentRequest(response.data);
    });
  };

  const joinRoom = (room, request) => {
    // setRoom(request.chat[0]);

    if (room !== "" && room !== null) {
      socket.emit("join_room", room);
    } else {
    }
  };

  const updateRequestWithChat = async (request) => {
    if (request.chat.length === 0) {
      console.log(request.issuer);
      await setIssuer([request.issuer[0]]);
      console.log(issuer[0]);
      await setEmployee([request.employee]);
      await ChatService.create(issuer[0], employee[0], messages).then(
        (response) => {
          console.log("fff");
          console.log(response._id);
          console.log("teffst");
          setCurrentChat([request._id]);
          console.log(currentChat);
          // console.log(currentChat._id);
          request.chat = currentChat;
        }
      );
      await RequestService.updateRequest(request._id, request).then(
        (response) => {
          console.log(response.data);
        }
      );
    }
  };

  const sendMessage = async () => {
    // setRoom(currentRequest);
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      console.log(messageData);
      setMessages((list) => [...list, messageData]);
      console.log(currentRequest);
      ChatService.update(currentRequest.chat[0], messages).then((response) => {
        console.log(response);
      });
    }
  };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <div>
      <h1>Chat</h1>
      <div className="chat-header"></div>
      <div className="chat-body">
        {messages.map((messageContent) => {
          return (
            <div className="message">
              <div>
                <div className="message-content">
                  <p>
                    {messageContent.author}: {messageContent.message}
                  </p>
                </div>
                <div className="message-meta"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="enter message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
