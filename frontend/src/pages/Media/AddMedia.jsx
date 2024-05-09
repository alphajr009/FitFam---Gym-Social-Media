import React, { useState } from "react";
import Image from "../../assests/addMeal/addImage.png";
import Video from "../../assests/addMeal/addVideo.png";
import { Button, Modal } from "antd";
import axios from "axios";
import MediaPopUp from "./MediaPopUp";
import "../../css/AddWorkouts.css";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";


function AddMedia() {
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = user.name.split(" ")[0];

  const openModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/v1/feed/create",
        {
          description: mediaDescription,
          title: mediaTitle,
        }
      );
      console.log("Media created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating media:", error);
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
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={getUserImage()}
            alt=""
          />
          <input
            type="text"
            value={mediaDescription}
            onChange={(e) => setMediaDescription(e.target.value)}
            className="post-text"
            placeholder={"What's on your mind " + firstName}
            onClick={() => openModal(<MediaPopUp />)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file">
              <div className="item" onClick={() => openModal(<MediaPopUp />)}>
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <label htmlFor="file">
              <div className="item" onClick={() => openModal(<MediaPopUp />)}>
                <img src={Video} alt="" />
                <span>Add Video</span>
              </div>
            </label>
          </div>
          <div className="right">
            <Button type="primary" onClick={handlePost}>
              Post
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Create Post"
        visible={isModalVisible}
        onCancel={closeModal}
        className="add-media-modal"
        footer={null}
      >
        <hr />
        {modalContent}
      </Modal>
    </div>
  );
}

export default AddMedia;
