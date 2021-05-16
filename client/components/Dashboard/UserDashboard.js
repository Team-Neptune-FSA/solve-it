import React, { useState } from "react";
import { connect } from "react-redux";
import Solutions from "./Solutions";
import Issues from "./Issues";

const UserDashboard = ({ user: { name } }) => {
  const [view, setView] = useState("solutions");
  return (
    <>
      <div className="component" id="title-section">
        <h1>Hello {name}</h1>
      {/* </div> */}
      <button
        className={view === "solutions" ? "active" : ""}
        onClick={() => setView("solutions")}
      >
        Solutions
      </button>
      <button
        className={view === "issues" ? "active" : ""}
        onClick={() => setView("issues")}
      >
        Issues
      </button>
      {view === "solutions" ? <Solutions /> : <Issues />}
    </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(UserDashboard);
