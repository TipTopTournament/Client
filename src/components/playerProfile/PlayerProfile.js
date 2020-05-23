import React from "react";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import {api, handleError} from "../../helpers/api";

import Game from "../../views/Game";
import {Button} from "../../views/design/Button";
import ListGroup from "react-bootstrap/ListGroup";

class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      stats: {
        wins: 0,
        losses: 0,
        history: null,
        pointsConceded: 0,
        pointsScored: 0,
      },
      personalInfo: {
        vorname: null,
        nachname: null,
      },
    };
  }

  goBack(){
    const {tournamentCode} = this.props.match.params;
    if(localStorage.getItem("ParticipantID")){
      this.props.history.push(`/participant/${tournamentCode}/participantMenu`)
    }else{
      this.props.history.push(`/emanager/tournaments/${tournamentCode}`)
    }
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
      alert(
          `Something went wrong while fetching the player data: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <Container className="custom-container2">
        {!this.state.stats.history ? (
            <Row>
              <Col />
              <Col />
              <Col />
            </Row>
        ):(
        <Container className="custom-container2">
          <Row>
            <Col />
            <Col>
              <Table style={{marginTop:"100px"}} bordered hover size="sm">
                <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Sets won</th>
                  <th>Sets lost</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{this.state.personalInfo.vorname}</td>
                  <td>{this.state.personalInfo.nachname}</td>
                  <td>{this.state.stats.wins}</td>
                  <td>{this.state.stats.losses}</td>
                  <td>{this.state.stats.pointsScored}</td>
                  <td>{this.state.stats.pointsConceded}</td>
                </tr>
                </tbody>
              </Table>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col>
              <h5 style={{marginTop:"15px"}}>Game history</h5>
              <ListGroup variant="flush">
                {this.state.stats.history.map(gameData => {
                  return (
                      <ListGroup.Item style={{background:  "#F3F3FF",   display: "flex", alignItems: "center", justifyContent: "center"}} key={gameData.gameId}
                      >
                        <Game gameData={gameData} />
                      </ListGroup.Item>
                  )})}
              </ListGroup>
              <Button
                  style={{marginTop: "25px"}}
                  width="100%"
                  onClick={() => {
                    this.goBack();
                  }}
              >
                Back to Tournament Overview
              </Button>

            </Col>
            <Col />
          </Row>
        </Container>
        )}
      </Container>
    );
  }
}

export default withRouter(PlayerProfile);
