import React, { useState } from 'react';
import axios from 'axios';
import history from '../../history';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PostIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(1);
  const [language, setLanguage] = useState('javascript');

  const confirmSubmit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to submit this request?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleSubmit(),
        },
        {
          label: 'No',
          onClick: () => console.log('back'),
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    notifySubmit();
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

  return (
    <div className="post">
    <div className="component post-issue">
      <h1>What problem are you having trouble with?</h1>
      {/* <br/> */}
      <p>Describe the service you're looking to purchase - please be as detailed as possible:</p>
      <br/>
      <form onSubmit={handleSubmit}>
        <h2><label>Title: </label></h2>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        <br/>

        <h2><label>Description: </label></h2>
        <textarea
          id="issue-md"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
          <br/>

          <div style={{display:"flex"}}>
          <h2><label>Language: </label></h2>
        <select
          className="language-input"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">Javascript</option>
        </select>
        </div>
        <br/>
        <div style={{display:"flex"}}>
        <h2><label>Incentive Amount Price:$ (in cents)  </label></h2>
        <input
          className="price-input"
          type="integer"
          name="price-amount"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />{' '}
        </div>

        <br/>
        <div className="payment-div credit">
        <img style={{height: "100%", width: "100%", objectFit: "scale-down"}} src="../Images/credit.png" alt=""/>
        </div>
        <div className="payment-div paypal">
        <img style={{height: "100%", width: "100%", objectFit: "scale-down"}} src="../Images/paypal.png" alt=""/>
        </div>
        <div className="payment-div google-pay">
        <img style={{height: "100%", width: "100%", objectFit: "scale-down"}} src="../Images/googlepay.png" alt=""/>
        </div>
        <button onClick={confirmSubmit} className="post-issue-submit" type="submit">Submit Request</button>
      </form>
    </div>
    </div>
  );
};

export default PostIssue;
