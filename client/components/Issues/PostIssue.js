import React, { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../../history';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PostIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(1);
  const [language, setLanguage] = useState('javascript');

  const logginPrompt = () => {
    useEffect(() => {
      confirmAlert({
        message: 'Please sign up or log in to post an issue',
        buttons: [
          {
            label: 'Login',
            onClick: () => history.push('/login'),
          },
          {
            label: 'Signup',
            onClick: () => history.push('/signup'),
          },
          {
            label: 'Go home',
            onClick: () => history.push('/'),
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      });
    }, []);
  };

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
  const token = window.localStorage.getItem('token');
  return (
    <>
      {window.localStorage.getItem('token') ? (
        <div className="component post-issue">
          <h1>Post an Issue</h1>
          <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // placeholder="Title..."
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
              type="integer"
              name="price-amount"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />{' '}
            (in cents)
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>
          <div>{logginPrompt()}</div>
        </>
      )}
    </>
  );
};

export default PostIssue;
