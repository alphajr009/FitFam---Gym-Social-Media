import "../../css/leftBar.css";
import React from "react";
import { Link } from "react-router-dom";
import meals from "../../assests/leftNavbarIcons/meals.png";
import media from "../../assests/leftNavbarIcons/media.jpg";
import workouts from "../../assests/leftNavbarIcons/workouts.png";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";

function LeftBaR() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const getUserImage = () => {
    if (!user || !user.gender) {
      return defaultimg;
    } else if (user.gender === "male") {
      return male;
    } else if (user.gender === "female") {
      return female;
    } else {
      return defaultimg;
    }
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <Link to="/account" className="item">
            <div className="user">
              <img src={getUserImage()} alt="" />
              {user && <span>{user.name}</span>}
            </div>
          </Link>
          <div className="gap"></div>
          <Link to="/feed" className="item">
            <div className="item">
              <img src={media} alt="" />
              <span>Feed</span>
            </div>
          </Link>

          <Link to="/meal" className="item">
            <div className="item">
              <img src={meals} alt="" />
              <span>Meals</span>
            </div>
          </Link>

          <Link to="/workouts" className="item">
            <div className="item">
              <img src={workouts} alt="" />
              <span>Workouts</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftBaR;
