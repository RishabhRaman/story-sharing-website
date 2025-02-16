import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./submitstory.css";

const SubmitStory = () => {
  const [story, setStory] = useState({
    title: "",
    category: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/submit-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Story submitted successfully!");
        navigate("/stories");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="submit-container">
      <h2>Submit Your Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={story.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select name="category" value={story.category} onChange={handleChange} required>
          <option value="real-life">Real Life</option>
                    <option value="fiction">Fiction</option>
                    <option value="horror">Horror</option>
                    <option value="comedy">Comedy</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="mystery">Mystery</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="romance">Romance</option>
                    <option value="adventure">Adventure</option>
          </select>
        </div>

        <div className="input-group">
          <label>Story Content</label>
          <textarea
            name="content"
            value={story.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default SubmitStory;
