import axios from 'axios';

const GOT_ALL_ISSUES = 'GOT_ALL_ISSUES';

export const setIssues = (issues) => ({
  type: GOT_ALL_ISSUES,
  issues,
});

export const fetchIssues = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/issues/');
      const issues = response.data;
      dispatch(setIssues(issues));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function allIssuesReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ISSUES:
      return action.issues;
    default:
      return state;
  }
}
