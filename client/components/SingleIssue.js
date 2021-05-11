// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchSingleProject } from "../redux/singleProject";

// class SelectedProject extends React.Component {
//   componentDidMount() {
//     const { projectId } = this.props.match.params;
//     this.props.getSingleProject(projectId);
//   }
//   render() {
//     const { singleProject } = this.props;
//     let { robots } = singleProject;
//     if (!robots) {
//       robots = [];
//     }
//     return (
//       <div id="single-select-project">
//         <div id="single-select-project-container">
//           <div>{singleProject.description}</div>
//           <div id="single-select-project-right">
//             <h2>Title: {singleProject.title}</h2>
//             <h4>Deadline: {singleProject.deadline}</h4>
//             <h4>Priority: {singleProject.priority}</h4>
//             <Link to={`${singleProject.id}/edit`}>
//               <button type="button" className="edit-button">
//                 Edit
//               </button>
//             </Link>
//           </div>
//         </div>

//         <h2>Robots Assinged to Project:</h2>
//         {robots.length ? (
//           <div>
//             {robots.map((robot) => (
//               <div key={robot.id} className="single-robot">
//                 <Link to={`/robots/${robot.id}`}>
//                   <img
//                     src={robot.imageUrl}
//                     alt={robot.name}
//                     height="150"
//                     width="150"
//                   />
//                   <h3>Name: {robot.name}</h3>
//                   <div>Fuel Type: {robot.fuelType}</div>
//                   <div>Fuel Level: {robot.fuelLevel}</div>
//                 </Link>
//                 <button
//                   type="button"
//                   className="edit-button"
//                   onClick={() => console.log("completed")}
//                 >
//                   Mark Complete
//                 </button>
//                 <button
//                   type="button"
//                   className="delete-button"
//                   onClick={() => this.props.deleteRobot(robot)}
//                 >
//                   Unassign
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="none-in-database">
//             Sorry there are no robots assigned to this project
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     singleProject: state.project.selectedProject,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getSingleProject: (projectId) => dispatch(fetchSingleProject(projectId)),
//   };
// };

// export default connect(mapState, mapDispatch)(SelectedProject);
