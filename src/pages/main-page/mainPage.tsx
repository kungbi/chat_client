import React from "react";
import "./mainPage.scss";
import { FirstPage } from "../first-page/firstPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../login-page/loginPage";
import { HomePage } from "../home-page/homePage";
import { ChatPage } from "../chat-page/chatPage";
import { AddFriendPage } from "../add-friend-page/addFriendPage";

export const MainPage = () => {
  return (
    <div className="main">
      <div className="main_container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/addFriend" element={<AddFriendPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};
