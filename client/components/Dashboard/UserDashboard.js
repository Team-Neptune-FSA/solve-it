import React, { useState } from "react";
import { connect } from "react-redux";
import Solutions from "./Solutions";
import Issues from "./Issues";

const UserDashboard = ({ user: { name } }) => {
  const [view, setView] = useState("solutions");
  return (
    <>
      <div>
        <div className="dashboardDivRight component" id="title-section">
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

        <div className="dashboardDivLeft component" id="title-section">
        <div className="userStats">
          <h1>You have solved 10 problems!</h1>
          <h1>You have 5 Accepted Solutions</h1>
          <h1>You have helped more than 97% of users!</h1>
        </div>

          <h1>What are you looking for?</h1>
          <div>
            <form method="get" action="/issues/post">
              <button className="btn blue-bg white" type="submit">
                Submit a new issue
              </button>
            </form>
          </div>
        </div>

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
