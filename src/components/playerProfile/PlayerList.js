import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import { withRouter } from "react-router-dom";
import { api } from "../../helpers/api";

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {
      playerList: []
    };
  }



  handleClickOnPlayer = (participantID) => {
    this.props.history.push(`/${this.props.match.params.tournamentCode}/participants/${participantID}`);
  };

  renderPlayerList(participant) {
    return (
      <tr key={participant.participantID} onClick={() => this.handleClickOnPlayer(participant.participantID)}>
        <td>{participant.participantID}</td>
        <td>{participant.vorname}</td>
        <td>{participant.nachname}</td>
        <td>{participant.licenseNumber}</td>
      </tr>
    );
  }

  async componentDidMount() {
    const tournamentsCode = this.props.match.params.tournamentCode;
    const response = await api.get(`/tournaments/${tournamentsCode}/leaderboard`);
    this.setState({ playerList: response.data });
    console.log("response", response.data);
    console.log('the tournamentcode is :', tournamentsCode);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col xs={12} sm={12} md={8}>
            <div>
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Licensenumber</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.playerList.map(playerObject =>
                    this.renderPlayerList(playerObject["participant"])
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(PlayerList);
