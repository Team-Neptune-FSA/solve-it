import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const percentRank = (arr, v) => {
  if (typeof v !== 'number') throw new TypeError('v must be a number');
  if (v === 0) {
    return 0;
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
  const [singleUserAttempted, setsingleUserAttempted] = useState(0);
  const [singleUserAccepted, setsingleUserAccepted] = useState(0);
  const [userSolutions, setUserSolutions] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const getStats = async () => {
      const { data: singleUserStats } = await axios.get('/api/users/stats', {
        headers: {
          authorization: token,
        },
      });
      setsingleUserAttempted(singleUserStats[0].solutionsAttempted);
      setsingleUserAccepted(singleUserStats[0].solutionsAccepted);

      const getUserSolutions = async () => {
        const { data: solutions } = await axios.get('/api/users/solutions', {
          headers: {
            authorization: token,
          },
        });
        setUserSolutions(solutions);
      };
      getUserSolutions();
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
      <div className="parent-stats-section">
        <div className="stats-section dashboard-solution-left">
          <div className="stats-text">
            <div className="text">
            <p>You have solved <span>{singleUserAttempted}</span> problems.</p>
            <br />
            <p>You have had <span>{singleUserAccepted}</span> solution(s) accepted.</p>
            <br />
            <p>You have answered more questions than
            <span>
              {' '}
              {(
                percentRank(solutionsAttemptedArr, singleUserAttempted) * 100
              ).toFixed(2)}{' '}
            </span>
            % of users.</p>
            <br />
            </div>
          </div>
        </div>

        <div className="dashboard-info dashboard-solution-right">
          {userSolutions.map((solution) => (
            <div className="solution-box" key={solution.id}>
              <Link to={`/issues/${solution.issue.id}`}>
                <div className="inside-solution">
                <h3>{solution.issue.title}</h3>
                <code>{solution.code}</code>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Solutions;
