import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


class TournamentInfo extends React.Component {
    constructor() {
        super();
        this.state = {};
    }


    participants() {
        const tournamentCode = this.props.match.params.tournamentsCode;
        console.log(tournamentCode);
        this.props.history.push(`/${tournamentCode}/playerlists`);
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
                        <Button type="button" onClick={() => this.participants()}>Participants</Button>
                    </Col>
                    <Col />
                </Row>
            </Container>

        )

    }
}

export default withRouter(TournamentInfo);