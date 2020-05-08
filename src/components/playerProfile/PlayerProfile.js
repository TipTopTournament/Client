import React from "react";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import { api } from "../../helpers/api";

import Game from "../../views/Game";

class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      stats: {
        wins: 0,
        losses: 0,
        history: 0,
      },
      personalInfo: {
        vorname: null,
        nachname: null,
      },
    };
  }

  renderEachMatchInHistory() {
    this.state.stats.history.map((gameData) => {
      return (
        <tr>
          <Game gameData={gameData} />
        </tr>
      );
    });
  }

  async componentDidMount() {
    const participantID = this.props.match.params.participantID;
    try {
      const response = await api.get(
        `/participants/${participantID}/statistics`
      );
      const response2 = await api.get(`/participants/${participantID}`);
      this.setState({ stats: response.data });
      this.setState({ personalInfo: response2.data });
    } catch (error) {
      console.log("something bad happened while fetching player stats", error);
    }
  }

  render() {
    return (
      <Container className="custom-container2">
        <Row>
          <Col />
          <Col>
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>Vorname</th>
                  <th>Nachname</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.personalInfo.vorname}</td>
                  <td>{this.state.personalInfo.nachname}</td>
                  <td>{this.state.stats.wins}</td>
                  <td>{this.state.stats.losses}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <h5>Game history</h5>
            <div>{this.renderEachMatchInHistory}</div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(PlayerProfile);
