import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateformat from 'dateformat';

const Payment = () => {
  const [stats, setstats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem('token');

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
      const { data: singleUserStats } = await axios.get('/api/users/stats', {
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

      <h1>Overall Balance</h1>

      <div className="stats-section">
        <div className="insideStats">
          Escrow: <strong>${(stats.totalEscrow / 100).toFixed(2)}</strong>
          <br />
          Paid:{' '}
          <strong style={{ color: 'red' }}>
            ${(stats.totalPaid / 100).toFixed(2)}
          </strong>
          <br />
          Earned:{' '}
          <strong style={{ color: 'green' }}>
            ${(stats.totalEarned / 100).toFixed(2)}
          </strong>
          <br />
        </div>
      </div>

      <br />
      <br />

      <h1>Transactions</h1>

      <div className="issueStats">
        {transactions.length ? (
          <div className="insideIssueStats">
            {transactions.map((transaction) => {
              let paymentPrice = transaction.price;
              if (!paymentPrice) {
                paymentPrice = transaction.issue.price;
              } else {
                paymentPrice = transaction.price;
              }

              return (
                <div key={transaction.id}>
                  {/* <br/> */}
                  <h2>Title: {transaction.title || transaction.issue.title}</h2>
                  <h3>
                    Date: {dateformat(transaction.createdAt, 'mmmm dS, yyyy')}
                  </h3>{' '}
                  <h3>
                    Price:{' '}
                    <strong
                      style={
                        transaction.isResolved === true
                          ? { color: 'red' }
                          : transaction.isResolved === false
                          ? { color: 'gray' }
                          : { color: 'green' }
                      }
                    >
                      ${(paymentPrice / 100).toFixed(2)}
                    </strong>
                  </h3>
                  <h3>
                    Status:{' '}
                    {transaction.isResolved === true
                      ? 'Paid'
                      : transaction.isResolved === false
                      ? 'Pending'
                      : 'Recieved'}
                  </h3>
                  <hr />
                </div>
              );
            })}
          </div>
        ) : (
          <h3>No Current Tranactions!</h3>
        )}
      </div>

      {/* Goal: make a div with a map of all issues(prices) and solutions where IsAccepted(prices) */}
    </>
  );
};

export default Payment;
