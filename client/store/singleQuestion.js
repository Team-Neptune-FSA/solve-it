import axios from "axios";

const GOT_QUESTION = "GOT_QUESTION";

export const setQuestion = (question) => ({
  type: GOT_QUESTION,
  question,
});

export const fetchQuestion = (questionId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/questions/${questionId}`);
      const question = response.data;
      dispatch(setQuestion(question));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function singleQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_QUESTION:
      return action.question;
    default:
      return state;
  }
}
