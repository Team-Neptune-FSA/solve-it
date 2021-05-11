import axios from 'axios';

const GOT_ISSUE = 'GOT_ISSUE';

export const setIssue = (issue) => ({
  type: GOT_ISSUE,
  issue,
});

export const fetchIssue = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/issues/${id}`);
      const issue = response.data;
      dispatch(setIssue(issue));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function singleIssueReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ISSUE:
      return action.issue;
    default:
      return state;
  }
}
