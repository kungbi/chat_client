import React from "react";
import "./homeNavigation.scss";
import friends from "../../assets/friends.png";
import chat from "../../assets/chat.png";

interface PropsType {
  setTab: React.Dispatch<React.SetStateAction<Number>>;
}
export const HomeNavigation = (props: PropsType) => {
  function onclickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    const value = parseInt(event.currentTarget.value, 10);
    if (value === 1) {
      props.setTab(1);
    } else {
      props.setTab(0);
    }
  }

  return (
    <div className="homeNavigation">
      <div className="container">
        <div className="friend">
          <button onClick={onclickHandler} value={0}>
            <img src={friends} alt="friends" />
          </button>
        </div>
        <div className="chat">
          <button onClick={onclickHandler} value={1}>
            <img src={chat} alt="chat" />
          </button>
        </div>
      </div>
    </div>
  );
};
