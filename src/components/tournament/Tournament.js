import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { withRouter } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "../../views/design/Button";
import {ButtonContainer} from "../../views/design/ButtonContainer";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";


const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Tournament extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      games: null,
      leaderBoardUsers: null,
    };
  }
  counter = 0;
  handleClick(id){
    const tournamentCode = this.props.match.params.tournamentCode;
    if (this.isNumeric(id)){

      this.props.history.push (`/${tournamentCode}/participants/${id}`)
    } else {
      this.props.history.push(`/${tournamentCode}/${id}`);
    }
  }
  isNumeric(value) {
    return /^\d+$/.test(value);
  }

  goBackToMenu(){
    const managerID = localStorage.getItem("ManagerID");
    this.props.history.push(`/manager/menu/${managerID}`);
  }

  renderLeaderBoard(leaderBoardUser) {
    this.counter ++;
    return (
        <tr key={leaderBoardUser["participant"].participantID} onClick={() => this.handleClick(leaderBoardUser["participant"].participantID)}>
          <td>{this.counter}</td>
          <td>{leaderBoardUser["participant"].vorname}</td>
          <td>{leaderBoardUser["participant"].nachname}</td>
          <td>{leaderBoardUser.wins}</td>
          <td>{leaderBoardUser.losses}</td>
          <td>{leaderBoardUser.pointsConceded}</td>
          <td>{leaderBoardUser.pointsScored}</td>
        </tr>
    );
  }

  async componentDidMount() {
    try {
      const {tournamentCode} = this.props.match.params;
      const response = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
      console.log(response.data);
      //response returns participants, with their wins e.g. {{participantObj1, wins1}, {participantObj2, wins2}}
      this.setState({ leaderBoardUsers : response.data });
      //I split it for the playerList since wins not relevant there
      const onlyParticipantArray = response.data.map(function (responseArray) {
        return responseArray["participant"];
      });
      this.setState({ users: onlyParticipantArray});
      this.counter = 0;
      const responseBracket = await api.get(`/tournaments/${tournamentCode}/bracket`);
      console.log(responseBracket.data);
      this.setState({ games : responseBracket.data });


    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }


  render() {
    return (
      <Container className= "custom-container2">
        {!this.state.users ||!this.state.games ||! this.state.leaderBoardUsers || this.state.leaderBoardUsers.length === 0? (
            <Row>
              <Col>
                <Card style={{background:  "#F3F3FF"}}>
                  <Card.Body>
                  <Card.Title> Playerlist </Card.Title>
                    <Card.Subtitle style={{color:"red"}}>No players have joined yet!</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card  style={{background:  "#F3F3FF"}}>
                  <Card.Body>
                  <Card.Title> Leaderboard </Card.Title>
                  <Card.Subtitle style={{color:"red"}}>No players have joined yet!</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
                <Button style ={{marginTop:'100px'}}
                    disabled={this.state.users}
                    type="button"
                    width="100%"
                    onClick={()=> this.handleClick('bracket')}
                >
                  Bracket
                </Button>
              <Button style ={{marginTop:'30px'}}
                      type="button"
                      width="100%"
                      onClick={() => {
                        this.goBackToMenu();
                      }}
              >
                Back to Menu
              </Button>
            </Row>
        ):(
        <Row>
          <Col>
            <Card style={{background:  "#F3F3FF"}}>
              <Card.Body >
              <Card.Title style={{marginBottom: "100px"}}> Playerlist </Card.Title>
                {this.state.users.map(user => {
                  return (
                    <PlayerContainer key={user.participantID} onClick={()=> this.handleClick(user.participantID)}>
                      <Player user={user} />
                    </PlayerContainer>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{background:  "#F3F3FF"}} onClick={()=> this.handleClick('leaderBoard')}>
              <Card.Body>
              <Card.Title> Leaderboard </Card.Title>
                <div>
                  <Table responsive="sm" style={{marginTop: "100px"}}>
                    <thead>
                    <tr>
                      <th>Rank</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Sets conceded</th>
                      <th>Sets scored</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.leaderBoardUsers.map(leaderBoardUser => {
                      return (
                          this.renderLeaderBoard(leaderBoardUser)
                      );
                    })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
            </Col>
            <Button
                width="100%"
                style ={{marginTop:'100px'}}
                onClick={()=> this.handleClick('bracket')}
            >
              Bracket
            </Button>
          <Button style ={{marginTop:'30px'}}
                  width="100%"
                  type="button"
                  onClick={() => {
                    this.goBackToMenu();
                  }}
          >
            Back to Menu
          </Button>
        </Row>
            )}
      </Container>
    );
  }
}

export default withRouter(Tournament);
