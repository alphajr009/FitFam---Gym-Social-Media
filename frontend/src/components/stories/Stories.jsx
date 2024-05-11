import React, { useState, useEffect } from "react";
import { Card, Modal, Form, Input, Row, Col, Select, Button } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/stories.css";
import ImageUploader from "../ImageUploader";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Meta } = Card;

function Story({ story, onClick }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleClick = () => {
    onClick(story);
  };

  return (
    <div className="sci" onClick={handleClick}>
      <img
        className="story-card-image"
        src={`/status/${story.id}.jpg`}
        alt="Hello"
      />

      {story.userId === user._id && <p className="story-your">Your Story</p>}
      <p>{story.uname}</p>
    </div>
  );
}

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
  const [storyID, setStoryID] = useState("");
  const [stories, setStories] = useState([]);
  const [uname, setUname] = useState(user.name);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { location } = window;

  const { Option } = Select;

  const [imageurl, setImageurl] = useState("");

  const onImageUpload = (imageFile) => {
    setImageurl(imageFile);
    console.log("Selected Image:", imageFile);
  };

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalVisible1(true);

    setDescription(story.description);
    setRunDistance(story.runDistance);
    setNumberOfPushups(story.numberPushups);
    setWeightLifted(story.weightLifted);
    setCaloriesBurned(story.caloriesBurned);
    setWorkoutType(story.workoutType);
    setWorkoutTime(story.workoutTime);
    setStoryID(story.id);
  };

  const closeModal = () => {
    setIsModalVisible1(false);
    setSelectedStory(null);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateStory = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await axios.get("/api/story/getAllStatus");
        const allStories = response.data;
        const loggedInUserId = user._id;

        const userStories = allStories.filter(
          (story) => story.userId === loggedInUserId
        );

        const otherStories = allStories.filter(
          (story) => story.userId !== loggedInUserId
        );

        userStories.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const sortedStories = userStories.concat(otherStories);

        setStories(sortedStories);
        setUname(user.name);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

    fetchStories();
  }, []);

  async function createStory() {
    console.log(imageurl);
    setUname(user.name);

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
    formData.append("uname", uname);

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
    setEditMode(false);
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

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleEditButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    changeStoryDetails(
      description,
      runDistance,
      numberOfPushups,
      weightLifted,
      caloriesBurned,
      workoutType,
      workoutTime,
      storyID
    );
  };

  async function changeStoryDetails(
    description,
    runDistance,
    numberOfPushups,
    weightLifted,
    caloriesBurned,
    workoutType,
    workoutTime,
    storyID
  ) {
    try {
      const res = await axios.patch("/api/story/updateStory", {
        id: storyID,
        description: description,
        runDistance: runDistance,
        numberOfPushups: numberOfPushups,
        weightLifted: weightLifted,
        caloriesBurned: caloriesBurned,
        workoutType: workoutType,
        workoutTime: workoutTime,
      });
      console.log(res.data);

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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

      <div className="all-stories">
        <Slider key={stories.length} {...settings}>
          {stories.map((story) => (
            <div key={story.id}>
              <Story story={story} onClick={() => openModal(story)} />
            </div>
          ))}
        </Slider>
      </div>

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

      <Modal
        visible={isModalVisible1}
        onCancel={closeModal}
        footer={null}
        width={560}
      >
        {selectedStory && (
          <div className="status-modal">
            <div className="sm-header">
              <h5>Workout Status</h5>
            </div>
            <div className="sm-content">
              {editMode ? (
                <div className="smc-body-form">
                  <Form
                    layout="vertical"
                    onValuesChange={handleFormChange}
                    initialValues={{
                      description,
                      runDistance,
                      numberOfPushups,
                      weightLifted,
                      caloriesBurned,
                      workoutType,
                      workoutTime,
                    }}
                  >
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
                            value={workoutTime}
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
                  <Button className="btn-save-status" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <img
                    className="story-card-image"
                    src={`/status/${selectedStory.id}.jpg`}
                    alt="Hello"
                  />
                  <Form layout="vertical" onValuesChange={handleFormChange}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item label="Run Distance">
                          <p>{selectedStory.runDistance} </p>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Number of Pushups">
                          <p>{selectedStory.numberPushups} </p>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item label="Weight Lifted">
                          <p>{selectedStory.weightLifted} </p>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Calories Burned">
                          <p>{selectedStory.caloriesBurned} </p>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item label="Workout Type">
                          <p>{selectedStory.workoutType} </p>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Workout Time">
                          <p>{selectedStory.workoutTime} </p>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Col>
                      <Form.Item label="Description">
                        <p>{selectedStory.description} </p>
                      </Form.Item>
                    </Col>
                  </Form>
                </div>
              )}
            </div>
            {selectedStory.userId === user._id && (
              <div className="edit-status-btn">
                <Button onClick={handleEditButtonClick}>
                  {editMode ? "Back" : "Edit"}
                </Button>{" "}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Stories;
