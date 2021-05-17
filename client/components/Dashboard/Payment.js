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

  console.log(transactions);

  return (
    <>
      <div className="stats-section">
        Escrow: ${(stats.totalEscrow / 100).toFixed(2)}
        <br />
        Paid: ${(stats.totalPaid / 100).toFixed(2)}
        <br />
        Earned: ${(stats.totalEarned / 100).toFixed(2)}
        <br />
      </div>

      <hr />
      {transactions.length ? (
        <div>
          {transactions.map((transaction) => {
            return (
              <div key={transaction.id}>
                {/* <br/> */}
                <h2>{transaction.title || transaction.issue.title}</h2>
                <h3>
                  {dateformat(transaction.createdAt, "mmmm dS, yyyy")}
                </h3>{" "}
                {/* Udpate this */}
                <h3>
                  $
                  {(
                    transaction.price / 100 || transaction.issue.price / 100
                  ).toFixed(2)}
                </h3>
                <h3>
                  {transaction.isResolved === true
                    ? "Paid"
                    : transaction.isResolved === false
                    ? "Pending"
                    : "Recieved"}
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No Current Tranactions!</h3>
      )}

      {/* Goal: make a div with a map of all issues(prices) and solutions where IsAccepted(prices) */}
    </>
  );
};

export default Payment;
