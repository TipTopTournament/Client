import React from "react";
import { Redirect } from "react-router-dom";

export const RegistrationGuard = props => {
    if (!localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already registered, redirects to the main /app
    return <Redirect to={"/tournament"} />;
};
