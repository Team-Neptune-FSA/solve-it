import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
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
  console.log(stats);
  return (
    <>
      <div className="stats-section">
        Escrow: ${(stats.totalEscrow / 100).toFixed(2)}
        Paid: ${(stats.totalPaid / 100).toFixed(2)}
        Earned: ${(stats.totalEarned / 100).toFixed(2)}
      </div>
    </>
  );
};

export default Payment;
