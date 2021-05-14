import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const percentRank = (arr, v) => {
  if (typeof v !== 'number') throw new TypeError('v must be a number');
  if (v === 0) {
    return;
  } else {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (v <= arr[i]) {
        while (i < l && v === arr[i]) i++;
        if (i === 0) return 0;
        if (v !== arr[i - 1]) {
          i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
        }
        return i / l;
      }
    }
    return 1;
  }
};

const Solutions = () => {
  const [solutionsAttemptedArr, setsolutionsAttemptedArr] = useState([]);
  const [singleUserStats, setsingleUserStats] = useState({});
  const [singleUserAttempted, setsingleUserAttempted] = useState(0);
  const [singleUserAccepted, setsingleUserAccepted] = useState(0);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const getStats = async () => {
      const { data: singleUserStats } = await axios.get('/api/users/stats', {
        headers: {
          authorization: token,
        },
      });
      setsingleUserStats(singleUserStats);
      setsingleUserAttempted(singleUserStats[0].solutionsAttempted);
      setsingleUserAccepted(singleUserStats[0].solutionsAccepted);
    };
    getStats();
    calculateRank();
  }, []);

  const calculateRank = async () => {
    const { data: allStats } = await axios.get('/api/stats');
    if (allStats.length) {
      let allSolutionsAttempted = [];
      for (let i = 0; i < allStats.length; i++) {
        allSolutionsAttempted.push(allStats[i].solutionsAttempted);
      }
      allSolutionsAttempted.sort((a, b) => a - b);
      setsolutionsAttemptedArr(allSolutionsAttempted);
    }
  };
  return (
    <>
      <div id="info-section">
        You have solved {singleUserAttempted} problems. You have had{' '}
        {singleUserAccepted} solution(s) accepted. You have answered more
        questions than{' '}
        {(
          percentRank(solutionsAttemptedArr, singleUserAttempted) * 100
        ).toFixed(2)}
        % of users.
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Solutions);
