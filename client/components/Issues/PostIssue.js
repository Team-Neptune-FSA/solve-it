import React, { useState } from "react";
import axios from "axios";
import history from "../../history";

// REACT MDE
// import ReactMde from "react-mde";
// import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";

// const converter = new Showdown.Converter({
//   tables: true,
//   simplifiedAutoLink: true,
//   strikethrough: true,
//   tasklists: true,
// });

const PostIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // React MDE
  // const [value, setValue] = React.useState("**Hello world!!!**");
  // const [selectedTab, setSelectedTab] = React.useState("write");

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
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Please help me solve this algorithm"
        />
        <label>Description: </label>
        {/* <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        /> */}
        <textarea
          id="issue-md"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostIssue;
