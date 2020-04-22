import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';


class TournamentInfo extends React.Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return(
            <Container>
                <Row>
                    <Col/>
                    <Col>
                        <h1>This is the picture</h1>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col/>
                    <Col>
                        <p>Here comes some information about the Tournament</p>
                    </Col>
                    <Col />
                </Row>
            </Container>

        )

    }
}

export default withRouter(TournamentInfo);