import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { me } from '../../store';

const Issues = ({ loadInitialData }) => {
  const [unresolved, setunresolved] = useState([]);
  const [resolved, setresolved] = useState([]);
  const [current, setcurrent] = useState([]);
  const [dummy, setdummy] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    loadInitialData();
    const getUserIssues = async () => {
      const { data: userIssues } = await axios.get('/api/users/issues', {
        headers: {
          authorization: token,
        },
      });
      setresolved(userIssues.filter((issue) => issue.isResolved));
      setunresolved(userIssues.filter((issue) => !issue.isResolved));
      setcurrent(userIssues.filter((issue) => !issue.isResolved));
    };
    getUserIssues();
  }, [dummy]);

  const filterIssues = (e) => {
    if (e.target.value === 'Unresolved') {
      setcurrent(unresolved);
    } else {
      setcurrent(resolved);
    }
  };

  const handleAccept = async (solution, issue) => {
    setdummy(!dummy);
    const token = window.localStorage.getItem('token');
    //sets issue to isResolved
    await axios.put(`/api/issues/${issue.id}`, null, {
      headers: {
        authorization: token,
      },
    });
    //sets chosen solution to isAccepted
    await axios.put(
      `/api/issues/${issue.id}/solutions/${solution.id}`,
      {
        ...solution,
        isAccepted: true,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    //rejects all other solutions
    await axios.put(`/api/issues/${issue.id}/solutions`, {
      solutionId: solution.id,
    });
    //handles payment
    await axios.put('/api/stats', {
      issue,
      solution,
    });
  };

  const handleReject = async (solution, issue) => {
    setdummy(!dummy);
    const token = window.localStorage.getItem('token');
    await axios.put(
      `/api/issues/${issue.id}/solutions/${solution.id}`,
      {
        ...solution,
        isRejected: true,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  };

  const toggleStar = async (solution, issue) => {
    const token = window.localStorage.getItem('token');
    setdummy(!dummy);
    await axios.put(
      `/api/issues/${issue.id}/solutions/${solution.id}`,
      {
        ...solution,
        isStarred: !solution.isStarred,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  };

  return (
    <>
      <div className="dashboard-info">
        <select onChange={filterIssues}>
          <option value="Unresolved">Unresolved</option>
          <option value="Resolved">Resolved</option>
        </select>
        {current.map((issue) => (
          <div className="issue" key={issue.id}>
            <Link to={`/issues/${issue.id}`}>
              <h3>{issue.title}</h3>
            </Link>
            <p>${(issue.price / 100).toFixed(2)}</p>
            <p>{issue.description}</p>
            <div>
              {issue.solutions.map((solution, idx) => (
                <div
                  className={`issue-solution box ${
                    solution.isRejected && 'rejected'
                  }`}
                  key={solution.id}
                >
                  <div className="flex">
                    <Link to={`/issues/${issue.id}/solutions/${solution.id}`}>
                      <h3>Solution #{idx + 1}</h3>
                    </Link>
                    <i
                      onClick={() => toggleStar(solution, issue)}
                      className={
                        solution.isStarred
                          ? 'fas fa-star blue'
                          : 'far fa-star blue'
                      }
                    ></i>
                  </div>
                  {solution.code && <code>{solution.code}</code>}
                  {solution.explanation && <p>{solution.explanation}</p>}
                  <button
                    onClick={() => handleAccept(solution, issue)}
                    className="btn blue-bg white"
                  >
                    Accept Solution
                  </button>
                  <button
                    onClick={() => handleReject(solution, issue)}
                    className="btn black-bg white"
                  >
                    Reject Solution
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(Issues);
