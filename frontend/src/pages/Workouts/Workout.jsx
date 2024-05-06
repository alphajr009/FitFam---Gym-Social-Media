import React from "react";
import Post from "./post";
import Stories from "../../components/stories/Stories";
import "../../css/workouts.css";
import AddWorkOuts from "./AddWorkOuts";

function Workout() {
  const posts = [
    {
      id: 1,
      name: "Lily Max",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Use handheld weights or machines. For squats and lunges, keep your weight in your heels or the center of your feet to prevent your knees from extending past your toes.",
      img: "https://www.cnet.com/a/img/resize/c50f0c28d07ba221bcc249f02b7996c3ca03d9ff/hub/2022/06/22/6c168667-b125-4be0-9cdd-c1636cde4e6a/gettyimages-thomas-barwick.jpg?auto=webp&fit=crop&height=675&width=1200",
    },
    {
      id: 2,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1713571200&semt=aishttps://dlye1hka1kz5z.cloudfront.net/media/blog_images/081721_Blog_Workouts.png",
      desc: "Use handheld weights or machines. For squats and lunges, keep your weight in your heels or the center of your feet to prevent your knees from extending past your toes.",
      img: "https://cdn.thewirecutter.com/wp-content/uploads/2020/03/onlineworkout-lowres-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024",
    },
    {
      id: 3,
      name: "Lily Max",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Use handheld weights or machines. For squats and lunges, keep your weight in your heels or the center of your feet to prevent your knees from extending past your toes.",
      img: "https://hips.hearstapps.com/hmg-prod/images/ab-workouts-1595971255.jpg",
    },
    {
      id: 4,
      name: "Ellis Max",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?cs=srgb&dl=pexels-pixabay-416778.jpg&fm=jpg",
      desc: "Use handheld weights or machines. For squats and lunges, keep your weight in your heels or the center of your feet to prevent your knees from extending past your toes.",
      img: "https://hips.hearstapps.com/hmg-prod/images/ab-workouts-for-women-2-text-1591198050.png?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*",
    },
  ];
  return (
    <div className="posts">
      <Stories />
      <AddWorkOuts />
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Workout;
