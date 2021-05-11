import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleQuestion } from "../store/singleQuestion";
import CodeEnvironment from "./Editor";

class SelectedQuestion extends React.Component {
  componentDidMount() {
    const { questionId } = this.props.match.params;
    this.props.getSingleQuestion(questionId);
  }
  render() {
    const { singleQuestion } = this.props;
    return (
      <div>
        <h2>Prompt: {singleQuestion.questionContent}</h2>
        <CodeEnvironment />
        <br />
        <h2>EXPLANATION SECTION</h2>
        <form>
          <label>
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <Link to={`${singleQuestion.id}/edit`}>
          <button type="button" className="edit-button">
            Edit
          </button>
        </Link> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleQuestion: state.singleQuestion,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleQuestion: (questionId) =>
      dispatch(fetchSingleQuestion(questionId)),
  };
};

export default connect(mapState, mapDispatch)(SelectedQuestion);
