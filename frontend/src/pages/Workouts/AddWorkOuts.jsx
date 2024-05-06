import React from 'react'
import '../../css/AddWorkouts.css'
import Image from '../../assests/addMeal/addImage.png'
import Video from '../../assests/addMeal/addVideo.png'
import Workout from '../../assests/addWorkOut/workout.png'
import { Button } from 'antd';


function AddWorkOuts() {
  return (
    <div className="share">
    <div className="container">
      <div className="top">
        <img
          src= "https://www.pinpng.com/pngs/m/80-804746_profile-icon-female-user-icon-png-transparent-png.png"
          alt=""
        />
        <input type="text" className='post-text' placeholder={`What's on your mind Gayathri ?`} />
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <input type="file" id="file" style={{display:"none"}} />
          <label htmlFor="file">
            <div className="item">
              <img src={Image} alt="" />
              <span>Add Image</span>
            </div>
          </label>
          <input type="file" id="file" style={{display:"none"}} />
          <label htmlFor="file">
          <div className="item">
            <img src={Video} alt="" />
            <span>Add Video</span>
          </div> 
          </label>
          <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src={Workout} alt="" />
                <span>WorkOut Plans</span>
              </div>
            </label>
        </div>
        <div className="right">
        <Button type="primary">Post</Button>

        </div>
      </div>
    </div>
  </div>
  )
}

export default AddWorkOuts