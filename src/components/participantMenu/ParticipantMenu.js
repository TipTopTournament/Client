import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { api } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

class ParticipantMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      player: null
    };
  }
  participants = () => {
    this.props.history.push(
      `/${this.props.match.params.tournamentCode}/playerlists`
    );
  };

  brackets = () => {
    this.props.history.push(
      `/${this.props.match.params.tournamentCode}/bracket`
    );
  };

  leaderboard = () => {
    this.props.history.push(
      `/${this.props.match.params.tournamentCode}/leaderBoard`
    );
  };

  leavetournament() {
    api.put(`//tournaments/${this.props.match.params.tournamentCode}/${localStorage.getItem("ParticipantID")}/leave`)
    localStorage.removeItem("token", "ParticipantID", "TournamentCode");
    this.props.history.push("/");
  }

  async ready() {
    //define new state
    const state = JSON.stringify({userState: "READY"});
    // send new state to backend
    try {
      await api.put(`/participants/${this.state.player.participantID}`, state);
    } catch (error) {
      console.log("could not update player state", error);
    }
    try {
      // get new state
      const playerUpdated = await api.get(
        `/participants/${this.state.player.participantID}`
      );
      // set updated player to the state
      this.setState({ player: playerUpdated });
    } catch (error) {
      console.log("could not set updated player", error);
    }
  }

  async componentDidMount() {
    const playerID = localStorage.getItem("ParticipantID"); //saved user in the local Storage
    try {
      const requestPlayer = await api.get(`/participants/${playerID}`);
      const player = new User(requestPlayer);
      this.setState({ player: player });
    } catch (error) {
      const dummyPlayer = {
        participantID: 420,
        name: "Dogg",
        vorname: "Snoop",
        username: "Snoop Dogg",
        token: 420420,
        licenseNumber: 420710,
        status: "NOTREADY"
      };
      this.setState({ player: dummyPlayer });
      console.log("could not fetch player", error, this.state.player);
    }
  }

  render() {
    if (!this.state.player) {
      return <div>Loading...</div>;
    }
    return (
      <Container className= "custom-container2">
        <Row>
          <Col />
          <Col>
            <h1>Menu</h1>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <div>
              {this.state.player.vorname} {this.state.player.name} is{" "}
              {this.state.player.status}
            </div>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <Button type="button" onClick={() => this.participants()}>
              Teilnehmer
            </Button>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <Button type="button" onClick={() => this.brackets()}>
              Brackets
            </Button>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <Button type="button" onClick={() => this.leaderboard()}>
              Leaderboard
            </Button>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <Button type="button" onClick={() => this.leavetournament()}>
              Leave tournament
            </Button>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col>
            <Button type="button" onClick={() => this.ready()}>
              Ready button
            </Button>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(ParticipantMenu);
