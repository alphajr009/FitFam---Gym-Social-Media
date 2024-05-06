import React from "react";
import Post from "./post";
import Stories from "../../components/stories/Stories";
import AddMeal from "./AddMeal";
import axios from "axios";
import { useState, useEffect } from "react";

function Meal() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/v1/mealplans/getAll");
        setMealPlans(response.data);
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
      <AddMeal />
      {mealPlans.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Meal;
