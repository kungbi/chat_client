import React, { useEffect, useState } from "react";
import back from "../../assets/back.png";
import "./addFriendPage.scss";
import useAxios from "../../hooks/UseAxios";
import { FriendListItem } from "../../components/friend-list-item/friendListItem";
import { useLocation, useNavigate } from "react-router";

export const AddFriendPage = () => {
  const location = useLocation();
  const { username, userId } = location.state;

  const navigation = useNavigate();
  const [textInput, setTextInput] = useState("");

  const { data: addFriendData, request: addFriendRequest } = useAxios<{
    result: boolean;
    message?: string;
  }>();

  const { data: getUserNameData, request: getUserNameRequest } = useAxios<{
    userId: number;
    username: string;
  }>();

  useEffect(() => {
    if (addFriendData && addFriendData.result) {
      alert(`Added complete`);
      setTextInput("");
    } else {
      alert(addFriendData?.message);
    }
  }, [addFriendData]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const onClickGetUserHandler = () => {
    if (textInput === "") return;
    getUserNameRequest({
      url: `http://localhost:4000/user/info/${textInput}`,
      method: "get",
    });
  };

  const onClickAddFriendHandler = (friendId: number) => {
    addFriendRequest({
      url: `http://localhost:4000/friend`,
      method: "post",
      data: {
        userId,
        friendId,
      },
    });
  };

  const onClickBackHandler = () => {
    navigation(-1);
  };

  return (
    <div className="AddFriendPage">
      <div className="header">
        <img src={back} alt="back" onClick={onClickBackHandler} />
        <span>Add by username</span>
        <button
          className={textInput !== "" ? "able" : ""}
          onClick={onClickGetUserHandler}
        >
          confirm
        </button>
      </div>
      <input
        value={textInput}
        placeholder="Friend Name"
        onChange={onChangeHandler}
      />
      {getUserNameData?.username ? (
        <FriendListItem
          name={getUserNameData.username}
          onclickHandler={() => onClickAddFriendHandler(getUserNameData.userId)}
        />
      ) : (
        <div className="notFound">- Not Found -</div>
      )}
    </div>
  );
};
