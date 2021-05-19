import React, { useState } from 'react';
import { connect } from 'react-redux';
import Solutions from './Solutions';
import Issues from './Issues';
import Payment from './Payment';

const UserDashboard = ({ user: { name } }) => {
  const [view, setView] = useState('solutions');
  return (
    <>
      <div>
        <div className="dashboardDivRight component" id="-section">
          <h1>Hello {name}!</h1>
          {/* </div> */}
          <button
            className={view === 'solutions' ? 'active' : ''}
            onClick={() => setView('solutions')}
          >
            Solutions
          </button>
          <button
            className={view === 'issues' ? 'active' : ''}
            onClick={() => setView('issues')}
          >
            Issues
          </button>
          <button
            className={view === 'payment' ? 'active' : ''}
            onClick={() => setView('payment')}
          >
            Payment
          </button>
          {view === 'solutions' && <Solutions />}
          {view === 'issues' && <Issues />}
          {view === 'payment' && <Payment />}
        </div>

        {/* <div className="dashboardDivLeft component" id="title-section">
            <h1>What are you looking for?</h1>
            <div>
              <form method="get" action="/issues/post">
                <button className="btn blue-bg white" type="submit">
                  Submit a new issue
                </button>
              </form>
            </div>
          </div> */}
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
