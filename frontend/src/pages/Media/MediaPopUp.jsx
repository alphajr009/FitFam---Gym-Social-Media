import React, { useState, useEffect } from "react";
import { Form, Input, Switch, Button, message } from "antd";
import "../../css/MediaPopUp.css";
import ImageBulkUploader from "../../components/ImageBulkUploader";
import VideoUploader from "../../components/VideoUploader";
import axios from "axios";
import defaultimg from "../../assests/default.png";
import male from "../../assests/male.png";
import female from "../../assests/female.png";

function MediaPopUp({}) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const firstName = user.name.split(" ")[0];
  const [formValid, setFormValid] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [isVideo, setisVideo] = useState(false);
  const [imageurls, setImageurls] = useState(Array(3).fill(""));
  const [imageurl, setImageurl] = useState("");

  const onVideoUpload = (imageFile) => {
    setImageurl(imageFile);
    console.log("Selected Video:", imageFile);
  };

  const onImageUpload = (index, imageFile) => {
    setImageurls((prevImageurls) => {
      const newImageurls = [...prevImageurls];
      newImageurls[index] = imageFile;
      console.log(`Image at index ${index}:`, imageFile);
      return newImageurls;
    });
  };

  const handleVideoSelect = () => {
    setIsVideoSelected(!isVideoSelected);
    setisVideo(!isVideoSelected);
    console.log(!isVideo);
  };

  const createMedia = async () => {
    console.log(imageurls);

    const formData = new FormData();
    formData.append("userid", user._id);
    formData.append("description", description);
    formData.append("video", imageurl);
    formData.append("isVideo", isVideo);
    console.log("isVideo", isVideo);

    imageurls.forEach((image, index) => {
      if (image) {
        formData.append("images", image, `${user._id}-${index}.jpg`);
      }
    });

    console.log("imageurls:", imageurls);

    try {
      const result = await axios.post("api/v1/feed/addFeed", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Media created:", result.data);
      window.location.href = "/feed";
    } catch (error) {
      console.log("Error creating Media:", error);
    }
  };

  const handlePost = () => {
    if (description || imageurls.some(url => url) || imageurl) {
      createMedia();
    } else {
      message.error('Please enter a description or upload photos or a video.');
    }
  };

  useEffect(() => {
    setFormValid(description || imageurls.some(url => url) || imageurl);
  }, [description, imageurls, imageurl]);

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
    <Form layout="vertical">
      <div className="userInfo">
        <img src={getUserImage()} alt="" />
        <div className="details">
          <span className="name">{user.name}</span>
        </div>
      </div>
      <Form.Item
        label={
          <span className="media-head-title">
            What's on your mind {firstName}?
          </span>
        }
      >
        <Input.TextArea
          style={{ height: "150px", width: "800px" }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter your description"
          className="custom-input"
        />
      </Form.Item>
      <Form.Item>
        <span className="media-head-title" style={{ marginRight: 10 }}>
          Upload Video
        </span>
        <Switch checked={isVideoSelected} onChange={handleVideoSelect} />
      </Form.Item>

      {isVideoSelected ? (
        <div className="crb-s3-images-upload">
          <div className="scrb-s3-iu-wrapper">
            <VideoUploader onVideoUpload={onVideoUpload} />
          </div>
        </div>
      ) : (
        <div className="crb-s2-images-upload">
          <div className="scrb-s2-iu-wrapper">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <ImageBulkUploader
                  key={index}
                  index={index}
                  onImageUpload={onImageUpload}
                />
              ))}
          </div>
        </div>
      )}
      <Button
        key="submit"
        type="primary"
        className="post-button"
        onClick={handlePost}
        disabled={!formValid}
      >
        Post
      </Button>
    </Form>
  );
}

export default MediaPopUp;
