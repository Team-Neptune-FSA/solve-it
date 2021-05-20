import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="topHeader">
      <div className="header">
        <Link to="/">
          <svg
            id="logo"
            width="400"
            height="50"
            viewBox="0 0 516 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1" fill="white">
              <path d="M39.496 108.152C31.912 108.152 24.568 107 17.464 104.696C10.456 102.296 4.93599 99.224 0.903992 95.48L6.23199 84.248C10.072 87.704 14.968 90.536 20.92 92.744C26.968 94.856 33.16 95.912 39.496 95.912C47.848 95.912 54.088 94.52 58.216 91.736C62.344 88.856 64.408 85.064 64.408 80.36C64.408 76.904 63.256 74.12 60.952 72.008C58.744 69.8 55.96 68.12 52.6 66.968C49.336 65.816 44.68 64.52 38.632 63.08C31.048 61.256 24.904 59.432 20.2 57.608C15.592 55.784 11.608 53 8.24799 49.256C4.98399 45.416 3.35199 40.28 3.35199 33.848C3.35199 28.472 4.74399 23.624 7.52799 19.304C10.408 14.984 14.728 11.528 20.488 8.93599C26.248 6.344 33.4 5.048 41.944 5.048C47.896 5.048 53.752 5.816 59.512 7.352C65.272 8.88799 70.216 11.096 74.344 13.976L69.592 25.496C65.368 22.808 60.856 20.792 56.056 19.448C51.256 18.008 46.552 17.288 41.944 17.288C33.784 17.288 27.64 18.776 23.512 21.752C19.48 24.728 17.464 28.568 17.464 33.272C17.464 36.728 18.616 39.56 20.92 41.768C23.224 43.88 26.056 45.56 29.416 46.808C32.872 47.96 37.528 49.208 43.384 50.552C50.968 52.376 57.064 54.2 61.672 56.024C66.28 57.848 70.216 60.632 73.48 64.376C76.84 68.12 78.52 73.16 78.52 79.496C78.52 84.776 77.08 89.624 74.2 94.04C71.32 98.36 66.952 101.816 61.096 104.408C55.24 106.904 48.04 108.152 39.496 108.152Z" />
              <path d="M130.229 107.864C122.645 107.864 115.829 106.184 109.781 102.824C103.733 99.464 98.9815 94.856 95.5255 89C92.1655 83.048 90.4855 76.328 90.4855 68.84C90.4855 61.352 92.1655 54.68 95.5255 48.824C98.9815 42.872 103.733 38.264 109.781 35C115.829 31.64 122.645 29.96 130.229 29.96C137.813 29.96 144.581 31.64 150.533 35C156.581 38.264 161.285 42.872 164.645 48.824C168.101 54.68 169.829 61.352 169.829 68.84C169.829 76.328 168.101 83.048 164.645 89C161.285 94.856 156.581 99.464 150.533 102.824C144.581 106.184 137.813 107.864 130.229 107.864ZM130.229 95.768C135.125 95.768 139.493 94.664 143.333 92.456C147.269 90.152 150.341 86.984 152.549 82.952C154.757 78.824 155.861 74.12 155.861 68.84C155.861 63.56 154.757 58.904 152.549 54.872C150.341 50.744 147.269 47.576 143.333 45.368C139.493 43.16 135.125 42.056 130.229 42.056C125.333 42.056 120.917 43.16 116.981 45.368C113.141 47.576 110.069 50.744 107.765 54.872C105.557 58.904 104.453 63.56 104.453 68.84C104.453 74.12 105.557 78.824 107.765 82.952C110.069 86.984 113.141 90.152 116.981 92.456C120.917 94.664 125.333 95.768 130.229 95.768Z" />
              <path d="M188.948 0.151993H202.772V107H188.948V0.151993Z" />
              <path d="M296.703 30.68L263.294 107H249.182L215.774 30.68H230.174L256.382 91.88L283.167 30.68H296.703Z" />
              <path d="M376.471 69.272C376.471 70.328 376.375 71.72 376.183 73.448H314.263C315.127 80.168 318.055 85.592 323.047 89.72C328.135 93.752 334.423 95.768 341.911 95.768C351.031 95.768 358.375 92.696 363.943 86.552L371.575 95.48C368.119 99.512 363.799 102.584 358.615 104.696C353.527 106.808 347.815 107.864 341.479 107.864C333.415 107.864 326.263 106.232 320.023 102.968C313.783 99.608 308.935 94.952 305.479 89C302.119 83.048 300.439 76.328 300.439 68.84C300.439 61.448 302.071 54.776 305.335 48.824C308.695 42.872 313.255 38.264 319.015 35C324.871 31.64 331.447 29.96 338.743 29.96C346.039 29.96 352.519 31.64 358.183 35C363.943 38.264 368.407 42.872 371.575 48.824C374.839 54.776 376.471 61.592 376.471 69.272ZM338.743 41.624C332.119 41.624 326.551 43.64 322.039 47.672C317.623 51.704 315.031 56.984 314.263 63.512H363.223C362.455 57.08 359.815 51.848 355.303 47.816C350.887 43.688 345.367 41.624 338.743 41.624Z" />
              <path d="M398.979 107.864C396.291 107.864 393.986 106.952 392.066 105.128C390.146 103.208 389.186 100.808 389.186 97.928C389.186 95.144 390.146 92.84 392.066 91.016C393.986 89.096 396.291 88.136 398.979 88.136C401.667 88.136 403.922 89.048 405.746 90.872C407.57 92.696 408.483 95.048 408.483 97.928C408.483 100.808 407.523 103.208 405.603 105.128C403.779 106.952 401.571 107.864 398.979 107.864Z" />
              <path d="M430.307 6.19999H444.707V107H430.307V6.19999Z" />
              <path d="M515.782 102.536C513.766 104.264 511.27 105.608 508.294 106.568C505.318 107.432 502.246 107.864 499.078 107.864C491.398 107.864 485.446 105.8 481.222 101.672C476.998 97.544 474.886 91.64 474.886 83.96V42.056H461.926V30.68H474.886V13.976H488.71V30.68H510.598V42.056H488.71V83.384C488.71 87.512 489.718 90.68 491.734 92.888C493.846 95.096 496.822 96.2 500.662 96.2C504.886 96.2 508.486 95 511.462 92.6L515.782 102.536Z" />
            </mask>
            <path
              d="M39.496 108.152C31.912 108.152 24.568 107 17.464 104.696C10.456 102.296 4.93599 99.224 0.903992 95.48L6.23199 84.248C10.072 87.704 14.968 90.536 20.92 92.744C26.968 94.856 33.16 95.912 39.496 95.912C47.848 95.912 54.088 94.52 58.216 91.736C62.344 88.856 64.408 85.064 64.408 80.36C64.408 76.904 63.256 74.12 60.952 72.008C58.744 69.8 55.96 68.12 52.6 66.968C49.336 65.816 44.68 64.52 38.632 63.08C31.048 61.256 24.904 59.432 20.2 57.608C15.592 55.784 11.608 53 8.24799 49.256C4.98399 45.416 3.35199 40.28 3.35199 33.848C3.35199 28.472 4.74399 23.624 7.52799 19.304C10.408 14.984 14.728 11.528 20.488 8.93599C26.248 6.344 33.4 5.048 41.944 5.048C47.896 5.048 53.752 5.816 59.512 7.352C65.272 8.88799 70.216 11.096 74.344 13.976L69.592 25.496C65.368 22.808 60.856 20.792 56.056 19.448C51.256 18.008 46.552 17.288 41.944 17.288C33.784 17.288 27.64 18.776 23.512 21.752C19.48 24.728 17.464 28.568 17.464 33.272C17.464 36.728 18.616 39.56 20.92 41.768C23.224 43.88 26.056 45.56 29.416 46.808C32.872 47.96 37.528 49.208 43.384 50.552C50.968 52.376 57.064 54.2 61.672 56.024C66.28 57.848 70.216 60.632 73.48 64.376C76.84 68.12 78.52 73.16 78.52 79.496C78.52 84.776 77.08 89.624 74.2 94.04C71.32 98.36 66.952 101.816 61.096 104.408C55.24 106.904 48.04 108.152 39.496 108.152Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M130.229 107.864C122.645 107.864 115.829 106.184 109.781 102.824C103.733 99.464 98.9815 94.856 95.5255 89C92.1655 83.048 90.4855 76.328 90.4855 68.84C90.4855 61.352 92.1655 54.68 95.5255 48.824C98.9815 42.872 103.733 38.264 109.781 35C115.829 31.64 122.645 29.96 130.229 29.96C137.813 29.96 144.581 31.64 150.533 35C156.581 38.264 161.285 42.872 164.645 48.824C168.101 54.68 169.829 61.352 169.829 68.84C169.829 76.328 168.101 83.048 164.645 89C161.285 94.856 156.581 99.464 150.533 102.824C144.581 106.184 137.813 107.864 130.229 107.864ZM130.229 95.768C135.125 95.768 139.493 94.664 143.333 92.456C147.269 90.152 150.341 86.984 152.549 82.952C154.757 78.824 155.861 74.12 155.861 68.84C155.861 63.56 154.757 58.904 152.549 54.872C150.341 50.744 147.269 47.576 143.333 45.368C139.493 43.16 135.125 42.056 130.229 42.056C125.333 42.056 120.917 43.16 116.981 45.368C113.141 47.576 110.069 50.744 107.765 54.872C105.557 58.904 104.453 63.56 104.453 68.84C104.453 74.12 105.557 78.824 107.765 82.952C110.069 86.984 113.141 90.152 116.981 92.456C120.917 94.664 125.333 95.768 130.229 95.768Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M188.948 0.151993H202.772V107H188.948V0.151993Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M296.703 30.68L263.294 107H249.182L215.774 30.68H230.174L256.382 91.88L283.167 30.68H296.703Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M376.471 69.272C376.471 70.328 376.375 71.72 376.183 73.448H314.263C315.127 80.168 318.055 85.592 323.047 89.72C328.135 93.752 334.423 95.768 341.911 95.768C351.031 95.768 358.375 92.696 363.943 86.552L371.575 95.48C368.119 99.512 363.799 102.584 358.615 104.696C353.527 106.808 347.815 107.864 341.479 107.864C333.415 107.864 326.263 106.232 320.023 102.968C313.783 99.608 308.935 94.952 305.479 89C302.119 83.048 300.439 76.328 300.439 68.84C300.439 61.448 302.071 54.776 305.335 48.824C308.695 42.872 313.255 38.264 319.015 35C324.871 31.64 331.447 29.96 338.743 29.96C346.039 29.96 352.519 31.64 358.183 35C363.943 38.264 368.407 42.872 371.575 48.824C374.839 54.776 376.471 61.592 376.471 69.272ZM338.743 41.624C332.119 41.624 326.551 43.64 322.039 47.672C317.623 51.704 315.031 56.984 314.263 63.512H363.223C362.455 57.08 359.815 51.848 355.303 47.816C350.887 43.688 345.367 41.624 338.743 41.624Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M398.979 107.864C396.291 107.864 393.986 106.952 392.066 105.128C390.146 103.208 389.186 100.808 389.186 97.928C389.186 95.144 390.146 92.84 392.066 91.016C393.986 89.096 396.291 88.136 398.979 88.136C401.667 88.136 403.922 89.048 405.746 90.872C407.57 92.696 408.483 95.048 408.483 97.928C408.483 100.808 407.523 103.208 405.603 105.128C403.779 106.952 401.571 107.864 398.979 107.864Z"
              stroke="#00a4c7"
              // fill="#00a4c7"
              strokeWidth="20"
              // mask="url(#path-1-inside-1)"
            />
            <path
              d="M430.307 6.19999H444.707V107H430.307V6.19999Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
            <path
              d="M515.782 102.536C513.766 104.264 511.27 105.608 508.294 106.568C505.318 107.432 502.246 107.864 499.078 107.864C491.398 107.864 485.446 105.8 481.222 101.672C476.998 97.544 474.886 91.64 474.886 83.96V42.056H461.926V30.68H474.886V13.976H488.71V30.68H510.598V42.056H488.71V83.384C488.71 87.512 489.718 90.68 491.734 92.888C493.846 95.096 496.822 96.2 500.662 96.2C504.886 96.2 508.486 95 511.462 92.6L515.782 102.536Z"
              stroke="white"
              strokeWidth="15"
              mask="url(#path-1-inside-1)"
            />
          </svg>
        </Link>
        <nav>
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/issues"
                  className="main-nav"
                  activeClassName="main-nav-active"
                >
                  Issues
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="main-nav"
                  activeClassName="main-nav-active"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  {' '}
                  Logout{' '}
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <NavLink
                  exact
                  to="/issues"
                  className="main-nav"
                  activeClassName="main-nav-active"
                >
                  Issues
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/login"
                  className="main-nav"
                  activeClassName="main-nav-active"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/signup"
                  className="main-nav"
                  activeClassName="main-nav-active"
                >
                  Signup
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
