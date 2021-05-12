import React, { useState } from "react";
import axios from "axios";
import history from "../../history";

const PostIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    await axios.post(
      "/api/issues",
      {
        title,
        description,
      },
      { headers: { authorization: token } }
    );
    history.push("/dashboard");
  };

  console.log(title);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Please help me solve this algorithm"
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {/* <label>
          Tags:
          <input
            type="text"
            name="tags"
            placeholder="Javascript"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostIssue;
