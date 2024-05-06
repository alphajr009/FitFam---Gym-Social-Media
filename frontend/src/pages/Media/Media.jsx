import React from "react";
import Post from "./post";
import Stories from "../../components/stories/Stories";
import AddMedia from "./AddMedia";
import axios from "axios";
import { useState, useEffect } from "react";

function Media() {

  const[mediaPost,setMediaPost] =  useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/v1/feed/getAll");
        setMediaPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="posts">
      <Stories />
      <AddMedia />
      {mediaPost.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Media;
