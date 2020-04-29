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



  handleClickOnPlayer = (playerId) => {
    this.props.history.push(`/${this.props.match.params.tournamentCode}/participants/${playerId}`);
  }

  renderPlayerList(player) {
    return (
      <tr key={player.id} onClick={() => this.handleClickOnPlayer(player.id)}>
        <td>{player.id}</td>
        <td>{player.name}</td>
        <td>{player.vorname}</td>
        <td>{player.licenseNumber}</td>
      </tr>
    );
  }

  async componentDidMount() {

    const response = await api.get(`/tournaments/${tournamentsCode}/leaderboard`);
    this.setState({ playerList: response.data });
    const tournamentsCode = this.props.match.params.tournamentCode;
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
                    <th>Lizenznummer</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.playerList.map(player =>
                    this.renderPlayerList(player)
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
