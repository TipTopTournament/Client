import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { api } from "../../helpers/api";
import TournamentData from "../shared/models/TournamentData";
import Table from "react-bootstrap/Table";

class TournamentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      tournament: null,
      tournamentCode: null
    };
  }

  participants() {
    this.props.history.push(`/${this.state.tournamentCode}/playerList`);
  }

  async componentDidMount() {
    const tournamentCode = this.props.match.params.tournamentCode;
    this.setState({ tournamentCode: tournamentCode });
    try {
      const requestTournament = await api.get(`/tournaments/${tournamentCode}`);
      console.log("the tournament data is :", requestTournament);
      // here we can also store the tournament in localStorage to access it globally.
      // For example signed up players in playerList don't have to load from server again
      const tournament = new TournamentData(requestTournament);
      this.setState({ tournament: tournament });
    } catch (error) {
      const testTournament = {
        tournamentId: "testID",
        tournamentName: "TestName",
        tournamentState: "READY",
        location: "testlocation",
        startTime: 8,
        gameDuration: 30,
        breakDuration: 10,
        tournamentCode: this.state.tournamentCode,
        amountOfPlayer: 50,
        numberOfTables: 10,
        bracket: "bracketdata",
        leaderboard: "leaderboard",
        activePlayers: "playerwhoareactive"
      };
      this.setState({ tournament: testTournament });
      console.log(this.state.tournament.tournamentCode);
      console.log(
        "there is something wrong with getting the tournament data",
        error
      );
    }
  }

  render() {
    if (!this.state.tournament) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <h2>{this.state.tournament.tournamentName}</h2>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <h2>Informationen</h2>
            <Table>
              <tbody>
                <tr>
                  <td>Ort</td>
                  <td>{this.state.tournament.location}</td>
                </tr>
                <tr>
                  <td>Beginn</td>
                  <td>{this.state.tournament.startTime} Uhr</td>
                </tr>
              </tbody>
            </Table>
            <Button type="button" onClick={() => this.participants()}>
              Participants
            </Button>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(TournamentInfo);
