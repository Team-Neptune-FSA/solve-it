import React, { useState } from 'react';
import axios from 'axios';
import history from '../../history';

const PostIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [language, setLanguage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    await axios.post(
      '/api/issues',
      {
        title,
        description,
        price,
        language,
      },
      { headers: { authorization: token } }
    );
    history.push('/dashboard');
  };

  console.log(title);
  return (
    <div className="component">
      <h1>Post an Issue</h1>
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
        <textarea
          id="issue-md"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Language: </label>
        <select
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">Javascript</option>
        </select>
        <label>Price: </label>
        $
        <input
          type="text"
          name="price-amount"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostIssue;
