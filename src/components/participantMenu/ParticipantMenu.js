import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Redirect, withRouter} from "react-router-dom";
import { api } from "../../helpers/api";
import TournamentData from "../shared/models/TournamentData";
import Table from "react-bootstrap/Table";
import {Button} from "../../views/design/Button";


class ParticipantMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      tournament: null,
      tournamentCode: null
    };
  }

  leaveTournament(leave) {
    if(leave === true) {
      api.put(`/tournaments/${this.state.tournamentCode}/${localStorage.getItem("ParticipantID")}/leave`);
      this.props.history.push(`/tournamentCode`);

    } else {
      this.props.history.push(`/home`);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("ParticipantID");
    localStorage.removeItem("TournamentCode");
  }
  handleClick(id){
    this.props.history.push(`/${this.state.tournamentCode}/${id}`);
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
            <h2 style={{marginTop:"200px"}}>{this.state.tournament.tournamentName}</h2>
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
                  <td>Start time</td>
                  <td>{this.state.tournament.startTime}</td>
                </tr>
                <tr>
                  <td>Tournament description:</td>
                  <td>{this.state.tournament.informationBox}</td>
                </tr>
              </tbody>
            </Table>
              <Button
                  width="100%"
                  type="button" onClick={() => this.handleClick("playerList")}>
                  Participants
              </Button>
              <Button
                  width="100%"
                  style={{marginTop:"15px"}} type="button" onClick={() => this.handleClick("bracket")}>
                  Bracket
              </Button>
              <Button
                  width="100%"
                  style={{marginTop:"15px"}} type="button" onClick={() => this.handleClick("leaderBoard")}>
                  Leaderboard
              </Button>
              <Button
                  width="100%"
                  style={{marginTop:"15px"}} type="button" onClick={() => this.leaveTournament(true)}>
                  Leave Tournament
              </Button>
            <Button
                width="100%"
                style={{marginTop:"15px"}} type="button" onClick={() => this.leaveTournament(false)}>
              Logout
            </Button>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(ParticipantMenu);
