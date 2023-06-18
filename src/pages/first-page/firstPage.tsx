import React from "react";
import "./firstPage.scss";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/background_image.avif";

export const FirstPage = () => {
  return (
    <>
      <div className="top">
        <img src={backgroundImage} alt="backgroundImage" />
      </div>

      <div className="bottom">
        <div className="title">
          <span className="big">
            Enjoy the New experience of
            <br />
            chating with global friends
          </span>
          <span className="small">
            Connect people arround the world for free
          </span>
        </div>

        <div className="button_div">
          <Link to="/login" className="button">
            Get Started
          </Link>
        </div>

        <div className="powered">
          Powered by <b>woongbi</b>
        </div>
      </div>
    </>
  );
};
