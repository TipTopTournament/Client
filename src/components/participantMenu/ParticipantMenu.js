import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { api } from "../../helpers/api";
import TournamentData from "../shared/models/TournamentData";
import Table from "react-bootstrap/Table";
import {ButtonContainer} from "../../views/design/ButtonContainer";

class ParticipantMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      tournament: null,
      tournamentCode: null
    };
  }

  handleClick(id){
    if (id === "leave"){
      api.put(`/tournaments/${this.state.tournamentCode}/${localStorage.getItem("ParticipantID")}/leave`);
      this.props.history.push(`/tournamentCode`);
      localStorage.removeItem("token");
      localStorage.removeItem("ParticipantID");
      localStorage.removeItem("TournamentCode");
    } else{
      this.props.history.push(`/${this.state.tournamentCode}/${id}`);
    }
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
    const tournamentCode = this.props.match.params.tournamentCode;
    this.setState({ tournamentCode: tournamentCode });
    try {
      const response = await api.get(`/tournaments/${tournamentCode}`);
      console.log("the tournament data is :", response.data);
      // here we can also store the tournament in localStorage to access it globally.
      // For example signed up players in playerList don't have to load from server again
      const tournament = new TournamentData(response.data);
      this.setState({ tournament: tournament });
    } catch (error) {
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
      <Container className= "custom-container2" >
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
            <h5>Tournament Information</h5>
            <Table>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>{this.state.tournament.location}</td>
                </tr>
                <tr>
                  <td>Starttime</td>
                  <td>{this.state.tournament.startTime} Uhr</td>
                </tr>
              </tbody>
            </Table>

            <ButtonContainer>
              <Button type="button" onClick={() => this.handleClick("playerList")}>
                Participants
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button type="button" onClick={() => this.handleClick("bracket")}>
                Bracket
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button type="button" onClick={() => this.handleClick("leaderBoard")}>
              Leaderboard
            </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button type="button" onClick={() => this.handleClick("leave")}>
                Leave Tournament
              </Button>
            </ButtonContainer>
            <ButtonContainer>
            <Button type="button" onClick={() => this.ready()}>
              Ready button
            </Button>
            </ButtonContainer>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(ParticipantMenu);
