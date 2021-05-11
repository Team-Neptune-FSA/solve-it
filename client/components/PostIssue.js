import React from 'react';

const PostIssue = () => {
  return (
    <div>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="e.g. Please help me solve this algorithm"
          />
        </label>
        <label>
          Issue:
          <textarea type="text" name="issue" />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" placeholder="Javascript" />
        </label>
      </form>
    </div>
  );
};

export default PostIssue;
