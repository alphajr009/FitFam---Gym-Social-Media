import React from 'react'
import { useState, useEffect } from 'react';
import "../../css/comments.css";
import axios from 'axios';

function Comments({ mealPlanId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5005/api/v1/mealplans/getComments/${mealPlanId}`)
      .then(response => setComments(response.data)) 
      .catch(error => console.error('Error fetching comments:', error));
      console.log("comment " + mealPlanId);
  }, [mealPlanId]);

  const handleAddComment = () => {
    axios.post(`http://localhost:5005/api/v1/mealplans/addComment/${mealPlanId}`, { content: newComment })
      .then(response => {
        setComments(response.data);
        setNewComment('');
        console.log(response.data)
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <div className="comments">
    <div className="write">
      <input type="text" placeholder="Write a comment" value={newComment} onChange={e => setNewComment(e.target.value)} />
      <button onClick={handleAddComment}>Send</button>
    </div>
    {comments.map(comment => (
      <div key={comment.id} className="comment">
        <span>{comment.name}</span>
        <p>{comment.content}</p>
      </div>
    ))}
  </div>
  )
}

export default Comments