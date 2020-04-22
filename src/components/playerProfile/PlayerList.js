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
    this.props.history.push(`/participants/${playerId}`);
  }

  renderPlayerList(player) {
    return (
      <tr key={player.id} onClick={() => this.handleClickOnPlayer(player.id)}>
        <td>{player.id}</td>
        <td>{player.name}</td>
        <td>{player.vorname}</td>
        <td>{player.lizenznummer}</td>
      </tr>
    );
  }

  async componentDidMount() {
    const participants = [
      { name: "test", vorname: "mens", lizenznummer: "xD", id: 1 },
      { name: "testiiii", vorname: "womens", lizenznummer: "hehexD", id: 2 }
    ]; //somthing like get.api(tournaments/participantslist) to get all participants in a tournament
    //const players = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
    this.setState({ playerList: participants }); //response.data.results blablabla
  }

  render() {
    console.log('the props of this is :',this.props);
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
