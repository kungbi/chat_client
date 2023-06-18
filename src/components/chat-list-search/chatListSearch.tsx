import React from "react";
import serach from "../../assets/search.png";

import "./chatListSearch.scss";

interface PropsType {
  tab: Number;
}
export const ChatListSearch = (props: PropsType) => {
  return (
    <div className="ChatListSearch">
      <img src={serach} alt="search icon" />
      {props.tab === 1 ? "Search message..." : "Search friend..."}
    </div>
  );
};
