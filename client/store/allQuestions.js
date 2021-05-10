import axios from "axios";

const GOT_ALL_QUESTIONS = "GOT_ALL_QUESTIONS";

export const setQuestions = (questions) => ({
  type: GOT_ALL_QUESTIONS,
  questions,
});

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/questions/");
      const questions = response.data;
      dispatch(setQuestions(questions));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function allQuestionsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_QUESTIONS:
      return action.questions;
    default:
      return state;
  }
}
