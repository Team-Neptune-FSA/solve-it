import axios from "axios";

const GOT_SINGLE_SOLUTION = "GOT_SINGLE_SOLUTION";

export const setSingleSolution = (solution) => ({
  type: GOT_SINGLE_SOLUTION,
  solution,
});

export const fetchSingleSolution = (issueId, solutionId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/issues/${issueId}/solutions/${solutionId}`
      );
      const solution = response.data;
      dispatch(setSingleSolution(solution));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function singleSolutionReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_SOLUTION:
      return action.solution;
    default:
      return state;
  }
}