import React, { useState } from "react";
import "../../css/post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Post = ({ post }) => { //meal
  const [commentOpen, setCommentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(post.id);
  console.log(post.description);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setLiked(!liked); 
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.title}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="menu-container"
          >
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Share</MenuItem>
          </Menu>
        </div>
        <div className="content">
          <p>{post.description}</p>
          <div className="image-container">
            <div className="image-wrapper">
              <img src={`/meal/${post.id}-0.jpg`} alt="" />
              <img src={`/meal/${post.id}-0.jpg`} alt="" />
            </div>
            <img src={`/meal/${post.id}-0.jpg`} alt="" />
          </div>
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {liked ? post.likes + 1 : post.likes}
          </div>
          <div
            className="item"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            {post.comments}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments mealPlanId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
