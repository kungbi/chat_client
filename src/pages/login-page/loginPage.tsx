import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/background_image.avif";
import UseAxios from "../../hooks/UseAxios";
import "./loginPage.scss";

interface ResponseType {
  result: boolean;
  userId?: number;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();

  const { data, request } = UseAxios<ResponseType>();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onClickButton = async () => {
    const url = `http://localhost:4000/user/${username}`;
    await request({
      method: "get",
      url,
    });
    if (data && data.result) {
      navigate("/home", {
        state: {
          username,
          userId: data.userId,
        },
      });
    }
  };

  return (
    <>
      <div className="top">
        <img src={backgroundImage} alt="backgroundImage" />
      </div>

      <div className="bottom">
        <input
          onChange={onChangeText}
          className="input"
          placeholder="username"
        />
        <button onClick={onClickButton} className="button">
          Login
        </button>
      </div>
    </>
  );
};
