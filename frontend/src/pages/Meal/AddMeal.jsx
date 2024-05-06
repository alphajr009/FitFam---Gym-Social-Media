import React, { useState } from "react";
import Image from "../../assests/addMeal/addImage.png";
import Video from "../../assests/addMeal/addVideo.png";
// import Meal from "../../assests/addMeal/meal.png";
import { Button , Modal} from "antd";
import axios from 'axios';
import MealPopUp from "../Meal/MealPopUp";
import "../../css/AddWorkouts.css";


function AddMeal() {
  const [mealDescription, setMealDescription] = useState('');
  const [mealTitle, setMealTitle] = useState('');
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
      const response = await axios.post('http://localhost:5005/api/v1/mealplans/create', {
        description: mealDescription,
        title: mealTitle
      });
      console.log('Meal plan created:', response.data);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  return (
<div className="share">
      <div className="container">
        <div className="top">
          <img
            src="https://www.pinpng.com/pngs/m/80-804746_profile-icon-female-user-icon-png-transparent-png.png"
            alt=""
          />
          <input
            type="text"
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
            className="post-text"
            placeholder="What's on your mind ?"
            onClick={() => openModal(<MealPopUp />)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file">
              <div className="item" onClick={() => openModal(<MealPopUp />)}>
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {/* <label htmlFor="file">
              <div className="item" onClick={() => openModal(<MealPopUp />)}>
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

export default AddMeal;
