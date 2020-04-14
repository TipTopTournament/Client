import React from "react";
import {withRouter} from 'react-router-dom';

class PlayerProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            player: null
        };
    }

    render(){
        return (
            <h1>hello mens</h1>
        )

    }


}
export default withRouter(PlayerProfile);