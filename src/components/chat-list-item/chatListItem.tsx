import React from "react";
import "./chatListItem.scss";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

interface propsType {
  name: string;
  message: string;
  date: string;
  onclickHandler: any;
}
export const ChatListItem = (props: propsType) => {
  // const navigate = useNavigate();
  // navigate("/chat", {
  //   state: {
  //     username: props.name,
  //   },
  // });

  return (
    <div className="chatListItem" onClick={props.onclickHandler}>
      <div className="profileNstring">
        <img src={profile} alt="profile" />
        <div className="nameNmessage">
          <span className="name">{props.name}</span>
          <span className="message">{props.message}</span>
        </div>
      </div>
      <div className="date">{props.date}</div>
    </div>
  );
};
