import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatMessage } from "../../components/chat-message/chatMessage";
import back from "../../assets/back.png";
import send from "../../assets/send.png";
import useAxios from "../../hooks/UseAxios";
import io, { Socket } from "socket.io-client";
import { MessageBuilder } from "../../hooks/messageBuilder";
import "./chatPage.scss";

interface GetChatroomMessagesMessageData {
  userId: number;
  friendId: number;
  username: string;
  message: string;
  datetime: string;
}

export interface UserData {
  userId: number;
  username: string;
}
interface ChatPageLocationState extends UserData {
  friend: UserData;
}

export const ChatPage = () => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();
  const location = useLocation();
  const { userId, username, friend }: ChatPageLocationState = location.state;

  const [textInput, setTextInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageList, setMessageList] = useState<
    GetChatroomMessagesMessageData[]
  >([]);

  // 이전의 대화 내용 가져오기.
  const { data: getChatroomMessageData, request: getChatroomMessageRequest } =
    useAxios<{ messageList: any[] }>();

  useEffect(() => {
    // 이전의 대화 내용 가져오기
    getChatroomMessageRequest({
      method: "get",
      url: `http://localhost:4000/chatroom/${userId}/${friend.userId}`,
    });

    // 소켓 연결 설정
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    // 서버에 소켓 등록
    newSocket.emit("connection", { username, userId });

    // 연결 및 메시지 수신 이벤트 처리
    newSocket.on("message", (data) => {
      console.log(data);

      const message = MessageBuilder({
        message: data.message,
        userId: data.userId,
        username: data.username,
        friendId: data.friendId,
      });

      setMessageList((prev) => [...prev, message]);
    });

    // 연결 해제 시 처리
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (getChatroomMessageData?.messageList) {
      setMessageList(getChatroomMessageData.messageList);
    }
  }, [getChatroomMessageData]);

  const onClickHandlerSendMessage = () => {
    if (textInput === "") {
      return;
    }

    const message = MessageBuilder({
      message: textInput,
      friendId: friend.userId,
      userId,
      username,
    });
    setMessageList((prev) => [...prev, message]);
    if (!socket) {
      console.log("소켓이 없음.");
      return;
    }

    socket.emit("message", message, (response: any) => {
      console.log("메시지 전송 완료");
      console.log(response);
    });
    setTextInput("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const backClickHandler = () => {
    navigation(-1);
  };

  return (
    <div className="chatPage">
      <div className="header">
        <div className="container">
          <img src={back} alt="back" onClick={backClickHandler} />
        </div>
        <span>{friend.username}</span>
      </div>
      <div className="chatList" ref={messageBoxRef}>
        {messageList.map((message, idx) => (
          <ChatMessage
            key={idx}
            me={message.userId === userId}
            message={message.message}
            date={message.datetime}
          />
        ))}
      </div>
      <div className="messageBox">
        <div className="container">
          <input type="text" value={textInput} onChange={onChange} />
          <img src={send} alt="send" onClick={onClickHandlerSendMessage} />
        </div>
      </div>
    </div>
  );
};
