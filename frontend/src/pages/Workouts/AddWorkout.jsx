import React, { useState } from "react";
import Image from "../../assests/addWorkout/addImage.png";
import Video from "../../assests/addWorkout/addVideo.png";
// import Workout from "../../assests/addWorkout/Workout.png";
import { Button , Modal} from "antd";
import axios from 'axios';
import WorkoutPopUp from "./WorkoutPopUp";
import "../../css/AddWorkouts.css";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";



function AddWorkout() {
    
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = user.name.split(" ")[0];

  const [workoutDescription, setWorkoutDescription] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:5005/api/v1/workoutplans/create', {
        description: workoutDescription,
        title: workoutTitle
      });
      console.log('Workout plan created:', response.data);
    } catch (error) {
      console.error('Error creating Workout plan:', error);
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
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
            className="post-text"
            placeholder={"What's on your mind " + firstName}
            onClick={() => openModal(<WorkoutPopUp />)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file">
              <div className="item" onClick={() => openModal(<WorkoutPopUp />)}>
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {/* <label htmlFor="file">
              <div className="item" onClick={() => openModal(<WorkoutPopUp />)}>
                <img src={Video} alt="" />
                <span>Add Video</span>
              </div>
            </label> */}
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

export default AddWorkout;
