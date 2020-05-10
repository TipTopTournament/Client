import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const ParticipantLoginGuard = props => {
  if (!localStorage.getItem("token")) {
    console.log("eyoo")
    return props.children;
  }
  return null;
};
