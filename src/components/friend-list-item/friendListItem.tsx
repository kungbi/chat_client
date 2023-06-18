import React from "react";
import "./friendListItem.scss";
import profile from "../../assets/profile.png";

interface propsType {
  name: string;
  onclickHandler: any;
}

export const FriendListItem = (props: propsType) => {
  return (
    <div className="friendListItem" onClick={props.onclickHandler}>
      <img src={profile} alt="profile" />
      <div className="profile">
        <span className="name">{props.name}</span>
      </div>
    </div>
  );
};
