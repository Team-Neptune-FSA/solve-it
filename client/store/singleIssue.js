import axios from "axios";

const GOT_SINGLE_ISSUE = "GOT_SINGLE_ISSUE";

export const setSingleIssue = (issue) => ({
  type: GOT_SINGLE_ISSUE,
  issue,
});

export const fetchSingleIssue = (issueId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/issues/${issueId}`);
      const issue = response.data;
      dispatch(setSingleIssue(issue));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function singleIssueReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_ISSUE:
      return action.issue;
    default:
      return state;
  }
}
