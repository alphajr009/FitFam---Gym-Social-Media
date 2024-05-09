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
import axios from "axios";
import { Button, Modal, Input, Form } from "antd";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";

const { TextArea } = Input;

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState(post.description);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = user.name.split(" ")[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditModalVisible(true);
    handleClose();
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const editDescription = async () => {
    const id = post.id;
    try {
      const response = await axios.put(
        `http://localhost:5005/api/v1/feed/edit/${id}`,
        { description: editedPostContent } 
      );
      console.log("Post edited:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const deletePost = async () => {
    const id = post.id;

    try {
      const response = await axios.delete(
        `http://localhost:5005/api/v1/feed/delete/${id}`
      );
      console.log("Media deleted:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
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
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={getUserImage()} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              ></Link>
                 <span className="name">{user.name}</span>
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
            <MenuItem onClick={deletePost}>Delete</MenuItem>
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Share</MenuItem>
          </Menu>
        </div>
        <div className="content">
          <p>{post.description}</p>
          <div className="image-container">
            <div className="image-wrapper">
              <img src={`/media/${post.id}-0.jpg`} alt="" />
              <img src={`/media/${post.id}-1.jpg`} alt="" />
            </div>
            <img src={`/media/${post.id}-2.jpg`} alt="" />
          </div>
        </div>
        <div className="info">
          <div className="item">
            {/* {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post.likes} */}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comments}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
      <Modal
        title="Edit Post"
        visible={isEditModalVisible}
        onOk={editDescription}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <div className="userInfo">
          <img
            src={getUserImage()}
            alt=""
          />
          <div className="details">
          <span className="name">{user.name}</span>
          </div>
        </div>
        <Form.Item label={"What's on your mind " + firstName} >
          <TextArea
            style={{ height: "150px", width: "800px" }}
            value={editedPostContent}
            onChange={(e) => setEditedPostContent(e.target.value)}
            placeholder="Enter your description"
            className="custom-input"
          />
        </Form.Item>
        
        <Button
            key="submit"
            type="primary"
            className="post-button"
            onClick={editDescription}
          >
            Save
          </Button>
        
      </Modal>
    </div>
  );
};

export default Post;
