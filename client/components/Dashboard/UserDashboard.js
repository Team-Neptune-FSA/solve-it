import React, { useState } from "react";
import Solutions from "./Solutions";
import Issues from "./Issues";
import Payment from "./Payment";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const [view, setView] = useState("solutions");
  const {
    user: { name },
  } = useAuth();
  return (
    <>
      <div>
        <div className="dashboardDivRight component" id="-section">
          <h1 className="hello-text">Hello {name}!</h1>
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
          <button
            className={view === "payment" ? "active" : ""}
            onClick={() => setView("payment")}
          >
            Payment
          </button>
          {view === "solutions" && <Solutions />}
          {view === "issues" && <Issues />}
          {view === "payment" && <Payment />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
