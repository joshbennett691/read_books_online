import React, { useEffect, useState, useRef } from "react";
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
  const requestRef = useRef();
  requestRef.current = currentRequest;
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listOfMessages, setListOfMessages] = useState([]);
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
    setRoom(props.match.params.id);
    retrieveRequest(props.match.params.id);
    joinRoom(room, currentRequest);

    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [props.match.params.id, room, listOfMessages]);

  const retrieveRequest = async (id) => {
    await RequestService.getRequest(id).then((response) => {
      setCurrentRequest(response.data);
      requestRef.current = currentRequest;
    });

    if (currentRequest.chat.length === 0) {
      await setIssuer([currentRequest.issuer[0]]);
      await setEmployee([currentRequest.employee[0]]);
      await ChatService.create(issuer, employee, messages).then((response) => {
        console.log("chat created");
        setCurrentChat(response._id);
        currentRequest.chat = currentChat;
      });
    }

    await RequestService.updateRequest(currentRequest._id, currentRequest).then(
      (response) => {
        console.log(response.data);
      }
    );

    await ChatService.update();

    await ChatService.get(currentRequest.chat).then((response) => {
      console.log(response.data);
    });
  };

  const joinRoom = (room) => {
    if (room !== "" && room !== null) {
      socket.emit("join_room", room);
    } else {
    }
  };

  // const updateRequestWithChat = async (request, newMessages) => {
  //   console.log(requestRef.current);
  //   if (request.chat.length === 0) {
  //     await setIssuer([request.issuer[0]]);
  //     await setEmployee([request.employee]);
  //     await ChatService.create(
  //       request.issuer[0],
  //       request.employee[0],
  //       newMessages
  //     ).then((response) => {
  //       console.log("fff");
  //       console.log(response._id);
  //       console.log("teffst");
  //       setCurrentChat(response._id);
  //       console.log(currentChat);
  //       request.chat = currentChat;
  //     });
  //     await RequestService.updateRequest(request._id, request).then(
  //       (response) => {
  //         console.log(response.data);
  //       }
  //     );
  //   }
  //   console.log(currentChat);
  //   await ChatService.get(currentChat).then((response) => {
  //     console.log(response.data);
  //   });
  // };

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
      console.log(messages);
      let data = {
        employee: [],
        issuer: [],
        messages: [],
      };
      await ChatService.get(currentRequest.chat[0]).then((response) => {
        data = response.data;
        data.messages = messages;
        console.log(data);
        console.log(response.data);
      });
      await ChatService.update(currentRequest.chat[0], data).then(
        (response) => {
          console.log(response.data);
          console.log(response.data);
        }
      );
      await ChatService.get(currentRequest.chat[0]).then((response) => {
        console.log(response.data);
        console.log(response.data.messages);
        setListOfMessages(response.data.messages);
      });
    }
    console.log(listOfMessages);
    messageListDealer();
  };

  const messageListDealer = async () => {
    await ChatService.get(currentRequest.chat[0]).then((response) => {
      console.log(response.data);
    });
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
