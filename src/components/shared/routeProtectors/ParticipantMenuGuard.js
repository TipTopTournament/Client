import React from "react";
import { Redirect } from "react-router-dom";

export const ParticipantMenuGuard = props => {
    if (localStorage.getItem("ParticipantID") && localStorage.getItem("token")){
        return props.children;
    }
    return <Redirect to={"/login"} />;
};