import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchQuestions } from "../store/allQuestions";

class AllQuestions extends React.Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }
  render() {
    const { questions } = this.props;
    return (
      <div>
        <h1>All Question</h1>
        {/* <Link to="questions/create">
            <button type="button" className="add-button">
              Add Question
            </button>
          </Link> */}

        {questions.length ? (
          questions.map((question) => (
            <div key={question.id} className="single-question">
              <Link to={`/questions/${question.id}`}>
                <h2>Question: {question.questionContent}</h2>
              </Link>
            </div>
          ))
        ) : (
          <h2 className="none-in-database">There are no questions, sorry.</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    questions: state.allQuestions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
  };
};

export default connect(mapState, mapDispatch)(AllQuestions);
