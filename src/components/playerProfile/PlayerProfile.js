
import withRouter from "react-router-dom";
import React from "react";

class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      player: null
    };
  }
}
export default withRouter(PlayerProfile);
