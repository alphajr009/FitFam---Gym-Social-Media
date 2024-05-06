import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import "../../css/navbar.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import logo from "../../assests/logo512.png";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    } else if (e.key === "account") {
      window.location.href = "/account";
    }
    setVisible(false);
  };

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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="account">Account</Menu.Item>
      <Menu.Item key="logout">Sign out</Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>
            <img className="logo-nav" src={logo} alt="" />{" "}
          </span>
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search FitFam" />
        </div>
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={visible}
          onVisibleChange={(flag) => setVisible(flag)}
        >
          <div className="user" onClick={(e) => e.preventDefault()}>
            <img src={getUserImage()} alt="" />
            {user && <span>{user.name}</span>}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
