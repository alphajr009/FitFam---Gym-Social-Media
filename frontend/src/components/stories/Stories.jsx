import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import "../../css/stories.css";
import ImageUploader from "../ImageUploader";
import axios from "axios";

function Stories() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [formValid, setFormValid] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [description, setDescription] = useState("");
  const [runDistance, setRunDistance] = useState("");
  const [numberOfPushups, setNumberOfPushups] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");

  const { Option } = Select;

  const [imageurl, setImageurl] = useState("");

  const onImageUpload = (imageFile) => {
    setImageurl(imageFile);
    console.log("Selected Image:", imageFile);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateStory = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  async function createStory() {
    console.log(imageurl);

    const formData = new FormData();
    formData.append("image", imageurl);
    formData.append("userid", user._id);
    formData.append("description", description);
    formData.append("runDistance", runDistance);
    formData.append("numberOfPushups", numberOfPushups);
    formData.append("weightLifted", weightLifted);
    formData.append("caloriesBurned", caloriesBurned);
    formData.append("workoutType", workoutType);
    formData.append("workoutTime", workoutTime);

    try {
      const result = await axios.post("/api/story/createStory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Story created:", result.data);
      window.location.href = "/feed";
    } catch (error) {
      console.log("Error creating Story:", error);
    }
  }

  const handlePost = () => {
    createStory();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDescription("");
    setRunDistance("");
    setNumberOfPushups("");
    setWeightLifted("");
    setCaloriesBurned("");
    setWorkoutType("");
    setWorkoutTime("");
    setImageurl("");
  };

  const handleFormChange = () => {
    setFormValid(
      description &&
        runDistance !== "" &&
        numberOfPushups !== "" &&
        weightLifted !== "" &&
        caloriesBurned !== "" &&
        workoutType !== "" &&
        workoutTime !== "" &&
        imageurl !== ""
    );
  };

  useEffect(() => {
    handleFormChange();
  }, [
    description,
    runDistance,
    numberOfPushups,
    weightLifted,
    caloriesBurned,
    workoutType,
    workoutTime,
    imageurl,
  ]);

  const handleCategoryChange = (value) => {
    setWorkoutType(value);
  };

  // TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://img.taste.com.au/m3W-xKYX/taste/2017/07/quick-and-easy-meal-planner-128684-2.jpg",
    },
    {
      id: 2,
      name: "John",
      img: "https://img.taste.com.au/m3W-xKYX/taste/2017/07/quick-and-easy-meal-planner-128684-2.jpg",
    },
    {
      id: 3,
      name: "John",
      img: "https://img.taste.com.au/m3W-xKYX/taste/2017/07/quick-and-easy-meal-planner-128684-2.jpg",
    },
    {
      id: 4,
      name: "John",
      img: "https://img.taste.com.au/m3W-xKYX/taste/2017/07/quick-and-easy-meal-planner-128684-2.jpg",
    },
  ];

  return (
    <div className="stories">
      <div className="story" onClick={handleCreateStory}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5231/5231019.png"
          alt=""
        />
        <div className="story-bg">
          <span>Create Status</span>
          <button>+</button>
        </div>
      </div>
      {stories.map((story) => (
        <div className="story-all" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={560}
      >
        <div className="status-modal">
          <div className="sm-header">
            <h5>Workout Status</h5>
          </div>
          <div className="sm-content">
            <div className="smc-upload">
              <ImageUploader onImageUpload={onImageUpload} />
            </div>
            <div className="smc-body">
              <div className="smc-body-form">
                <Form layout="vertical" onValuesChange={handleFormChange}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Run Distance">
                        <Input
                          value={runDistance}
                          placeholder="Enter distance"
                          onChange={(e) => {
                            setRunDistance(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Number of Pushups">
                        <Input
                          placeholder="Enter number"
                          value={numberOfPushups}
                          onChange={(e) => {
                            setNumberOfPushups(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Weight Lifted">
                        <Input
                          placeholder="Enter weight"
                          onChange={(e) => {
                            setWeightLifted(e.target.value);
                          }}
                          value={weightLifted}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Calories Burned">
                        <Input
                          placeholder="Enter calories"
                          onChange={(e) => {
                            setCaloriesBurned(e.target.value);
                          }}
                          value={caloriesBurned}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Workout Type">
                        <Select
                          placeholder="Select type"
                          onChange={handleCategoryChange}
                          value={workoutType}
                        >
                          <Option value="running">Running</Option>
                          <Option value="weightlifting">Weightlifting</Option>
                          <Option value="cycling">Cycling</Option>
                          <Option value="yoga">Yoga</Option>
                          <Option value="swimming">Swimming</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Workout Time">
                        <Input
                          placeholder="Enter time in hrs"
                          onChange={(e) => {
                            setWorkoutTime(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Col>
                    <Form.Item label="Description">
                      <Input.TextArea
                        value={description}
                        maxLength={125}
                        placeholder="Enter description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Form>
              </div>
              <div className="smc-body-button">
                <Button
                  className={formValid ? "active-post-button" : ""}
                  disabled={!formValid}
                  onClick={handlePost}
                >
                  Post
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Stories;
