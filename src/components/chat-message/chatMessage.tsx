import React from "react";
import "./chatMessage.scss";

interface Props {
  message: string;
  me: boolean;
  date: string;
}
export const ChatMessage = (props: Props) => {
  const date = new Date(props.date);
  const dateString = `${date.getHours() % 12}:${date.getMinutes()} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;
  return (
    <div className={`chatMessage ${props.me ? "me" : "friend"}`}>
      <div className="container">
        <span className="text">{props.message}</span>
        <span className="date">{dateString}</span>
      </div>
    </div>
  );
};
