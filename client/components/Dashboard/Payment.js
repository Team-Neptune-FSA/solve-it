import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dateformat from "dateformat";

const Payment = () => {
  const [stats, setstats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const getTransactions = async () => {
      const { data: issues } = await axios.get(`/api/issues/myIssues`, {
        headers: { authorization: token },
      });
      const { data: solutions } = await axios.get(
        `/api/issues/solutions/accepted`,
        { headers: { authorization: token } }
      );
      setTransactions([...issues, ...solutions]);
    };
    getTransactions();

    const getPayment = async () => {
      const { data: singleUserStats } = await axios.get("/api/users/stats", {
        headers: {
          authorization: token,
        },
      });
      setstats(singleUserStats[0]);
    };
    getPayment();
  }, []);
  return (
    <>
      <br />
      <br />

      <div className="parent-payment-div">
        <div className="stats-section">
          <div className="insideStats">
            <h1>Overall Balance</h1>
            <br />
            Escrow: <strong>${(stats.totalEscrow / 100).toFixed(2)}</strong>
            <br />
            Paid:{" "}
            <strong style={{ color: "red" }}>
              ${(stats.totalPaid / 100).toFixed(2)}
            </strong>
            <br />
            Earned:{" "}
            <strong style={{ color: "green" }}>
              ${(stats.totalEarned / 100).toFixed(2)}
            </strong>
            <br />
          </div>
        </div>

        <br />
        <br />

        <div className="issue-transactions">
          {transactions.length ? (
            <div className="insideIssueStats">
              <h1>Transactions</h1>
              <br />
              {transactions.map((transaction) => {
                let paymentPrice = transaction.price;
                if (!paymentPrice) {
                  paymentPrice = transaction.issue.price;
                } else {
                  paymentPrice = transaction.price;
                }
                return (
                  <div key={transaction.id} className="transaction-box">
                    <div className="transaction-words">

                    <div className="issue-date">
                    <h2>Title: {transaction.title || transaction.issue.title}</h2>
                    <h3>Date: {dateformat(transaction.createdAt, "mmmm dS, yyyy")}</h3>{" "}
                    </div>

                    <div className="price-status">
                    <h3>
                      Price:{" "}
                      <strong
                        style={
                          transaction.isResolved === true
                            ? { color: "red" }
                            : transaction.isResolved === false
                            ? { color: "gray" }
                            : { color: "green" }
                        }
                      >
                        ${(paymentPrice / 100).toFixed(2)}
                      </strong>
                    </h3>

                    <h3>
                      Status:{" "}
                      {transaction.isResolved === true
                        ? "Paid"
                        : transaction.isResolved === false
                        ? "Pending"
                        : "Recieved"}
                    </h3>
                    </div>
                    <br />
                  </div>
              </div>
                );
              })}
            </div>
          ) : (
            <h3>No Current Tranactions!</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
