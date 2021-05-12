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

const IssueSolver = ({ user: { name, problemsSolved, solutionsAccepted } }) => {
  const [problemSolvedArr, setproblemSolvedArr] = useState([]);
  useEffect(() => {
    calculateRank();
  }, []);

  const calculateRank = async () => {
    const { data: users } = await axios.get('/api/users');
    if (users.length) {
      let allProblemsSolved = [];
      for (let i = 0; i < users.length; i++) {
        allProblemsSolved.push(users[i].problemsSolved);
      }
      allProblemsSolved.sort((a, b) => a - b);
      setproblemSolvedArr(allProblemsSolved);
    }
  };
  return (
    <>
      <div id="info-section">
        You have solved {problemsSolved} problems. You have had{' '}
        {solutionsAccepted} solution(s) accepted. You have answered more
        questions than{' '}
        {(percentRank(problemSolvedArr, problemsSolved) * 100).toFixed(2)}% of
        users.
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(IssueSolver);
