import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  if (localStorage.getItem("TournamentCode")){
    return <Redirect to ={`/${localStorage.getItem("TournamentCode")}/participantMenu`}/>;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to={"/tournament"} />; //TODO
};
