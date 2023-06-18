import React from "react";
import serach from "../../assets/search.png";
import add_friend from "../../assets/add-user.png";
import "./friendListSearch.scss";
import { useNavigate } from "react-router";

export const FriendListSearch = (props: { handelr: any }) => {
  const navigation = useNavigate();

  return (
    <div className="FriendListSearch">
      <div className="SearchContainer">
        <img src={serach} alt="search icon" />
        <input placeholder="Search friend..." />
      </div>
      <div className="Addcontainer">
        <img src={add_friend} alt="add friend" onClick={props.handelr} />
      </div>
    </div>
  );
};
