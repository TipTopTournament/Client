import React from "react";
import { withRouter } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";

class CreateTournament extends React.Component {
  constructor() {
    super();
  }
  /**
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a user is returned to the front-end
   * and its token is stored in the localStorage.
   */

  render() {
    return <Select />;
  }
}

export default withRouter(CreateTournament);
