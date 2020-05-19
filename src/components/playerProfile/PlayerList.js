import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import { withRouter } from "react-router-dom";
import { api } from "../../helpers/api";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";
import {Button} from "../../views/design/Button";

class PlayerList extends React.Component {
  constructor() {
    super();
    this.state = {
      playerList: [],
      tournament: {
        tournamentName: null,
        tournamentState: null,
      }
    };
  }
  handleClick(){
    this.props.history.push (`/${this.props.match.params.tournamentCode}/participantMenu`)
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
    const tournamentCode = this.props.match.params.tournamentCode;
    const response = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
    this.setState({ playerList: response.data });
    const responseTournament = await api.get(`/tournaments/${tournamentCode}`);
    this.setState({tournament : responseTournament.data});
    console.log("response", response.data);
    console.log('the tournamentcode is :', tournamentCode);
  }

  render() {
    return (
      <Container className= "custom-container2">
        <Row>
          <Col />
          <Col xs={12} sm={12} md={8}>
            <div>
              <TipTopTournamentLogo style={{display: "block",margin:"auto", marginTop:"15px", preserveAspectRatio: "xMinYMin slice", height: "30%", width: "30%"}}/>
              <h2 className="custom1" style={{color: "#2F80ED", textAlign: "center"}}>{this.state.tournament.tournamentName} - {this.state.tournament.tournamentState}</h2>
              <Table style={{marginTop: "15px"}} bordered hover size="sm">
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
              <Button
                  style={{marginTop: "25px"}}
                  width="100%"
                  onClick={() => {
                    this.handleClick();
                  }}
              >
                Back
              </Button>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(PlayerList);
