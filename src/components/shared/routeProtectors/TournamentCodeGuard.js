import React from "react";
import { Redirect } from "react-router-dom";

export const TournamentCodeGuard = (props) => {
  if (localStorage.getItem("TournamentCode") && localStorage.getItem("token")) {
    return (
      <Redirect
        to={`/participant/${localStorage.getItem(
          "TournamentCode"
        )}/participantMenu`}
      />
    );
  }
  if (localStorage.getItem("token")) {
    return props.children;
  }

  return <Redirect to={"/home"} />;
};
