import React, { useState, useEffect } from "react";
import axios from "axios";
import history from "../../history";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const PostIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("javascript");
  const notifySubmit = () =>
    toast("Issue Posted!", { position: toast.POSITION.BOTTOM_RIGHT });

  const logginPrompt = () => {
    useEffect(() => {
      confirmAlert({
        message: "Please sign up or log in to post an issue",
        buttons: [
          {
            label: "Login",
            onClick: () => history.push("/login"),
          },
          {
            label: "Signup",
            onClick: () => history.push("/signup"),
          },
          {
            label: "Go home",
            onClick: () => history.push("/"),
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      });
    }, []);
  };

  const confirmSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      message: "Are you sure you want to post this issue?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleSubmit(),
        },
        {
          label: "No",
          onClick: () => console.log("no"),
        },
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  const handleSubmit = async () => {
    const token = window.localStorage.getItem("token");
    const issuePrice = parseFloat(price) * 100;
    console.log(issuePrice);
    console.log(typeof issuePrice);
    await axios.post(
      "/api/issues",
      {
        title,
        description,
        price: issuePrice,
        language,
      },
      { headers: { authorization: token } }
    );
    notifySubmit();
    history.push("/dashboard");
  };

  const handlePrice = (e) => {
    const re = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  return (
    <>
      {window.localStorage.getItem("token") ? (
        <div className="post">
          <div className="component post-issue">
            <h1>Post an Issue</h1>
            <form onSubmit={confirmSubmit}>
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
              <div className="flex input-field">
                <label>Price: $ </label>
                <input
                  type="text"
                  name="price-amount"
                  value={price}
                  onChange={(e) => handlePrice(e)}
                />
              </div>
              <br />
              <div className="payment-div credit">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "scale-down",
                  }}
                  src="../Images/credit.png"
                  alt=""
                />
              </div>
              <div className="payment-div paypal">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "scale-down",
                  }}
                  src="../Images/paypal.png"
                  alt=""
                />
              </div>
              <div className="payment-div google-pay">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "scale-down",
                  }}
                  src="../Images/googlepay.png"
                  alt=""
                />
              </div>
              <button className="post-issue-submit" type="submit">
                Submit Request
              </button>
            </form>
          </div>
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
