import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FriendListItem } from "../../components/friend-list-item/friendListItem";
import useAxios from "../../hooks/UseAxios";
import AxiosCoreOutput from "../../common/axiosCoreOutput";
import { FriendListSearch } from "../../components/friend-list-serach/friendListSearch";
import "./homePage.scss";

interface FindFriendListOutput extends AxiosCoreOutput {
  friends?: {
    id: number;
    username: string;
  }[];
}
export interface UserData {
  userId: number;
  username: string;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, userId } = location.state;

  const { data: findFriendListData, request: findFriendListRequest } =
    useAxios<FindFriendListOutput>();

  useEffect(() => {
    const URL = `http://localhost:4000/friend/${userId}`;
    findFriendListRequest({
      method: "get",
      url: URL,
    });
  }, [findFriendListRequest, userId]);

  const onclickHandler = (friend: UserData) => {
    navigate("/chat", {
      state: {
        friend,
        userId,
        username,
      },
    });
  };

  const addFriendOnClickHandler = () => {
    navigate("/addFriend", { state: { userId, username } });
  };

  return (
    <div className="homePage">
      <FriendListSearch handelr={addFriendOnClickHandler} />
      <div className="home-main">
        {findFriendListData?.friends?.map((friend) => (
          <FriendListItem
            name={friend.username}
            onclickHandler={() =>
              onclickHandler({ userId: friend.id, username: friend.username })
            }
            key={friend.id}
          />
        ))}
      </div>
    </div>
  );
};
