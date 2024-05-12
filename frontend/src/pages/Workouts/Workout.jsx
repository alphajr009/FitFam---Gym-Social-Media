import React from "react";
import Post from "./post";
import Stories from "../../components/stories/Stories";
import AddWorkout from "./AddWorkout";
import axios from "axios";
import { useState, useEffect } from "react";

function Workout() {
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/v1/workoutplans/getAll");
        setWorkoutPlans(response.data);
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
      <AddWorkout />
      {workoutPlans.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Workout;
