import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { withRouter } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "../../views/design/Button";
import LeaderBoardPlayer from "../../views/LeaderBoardPlayer";
import {ButtonContainer} from "../../views/design/ButtonContainer";
import Card from "react-bootstrap/Card";


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


    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }


  render() {
    return (
      <Container className= "custom-container2">
        {!this.state.users ||! this.state.leaderBoardUsers || this.state.leaderBoardUsers.length === 0? (
            <Row>
              <Col>
                <Card style={{background:  "#F3F3FF"}}>
                  <Card.Body>
                  <Card.Title> Playerlist </Card.Title>
                    <Card.Subtitle style={{color:"red"}}>No players have joined yet!</Card.Subtitle>
                  </Card.Body>
                </Card>
                <ButtonContainer style ={{marginTop:'100px'}}>
                  <Button
                      width="100%"
                      onClick={()=> this.handleClick('bracket')}
                  >
                    Bracket
                  </Button>
                </ButtonContainer>
                <Button style ={{marginTop:'30px'}}
                        type="button"
                        onClick={() => {
                          this.goBackToMenu();
                        }}
                >
                  Back to Menu
                </Button>
              </Col>
              <Col>
                <Card  style={{background:  "#F3F3FF"}}>
                  <Card.Body>
                  <Card.Title> Leaderboard </Card.Title>
                  <Card.Subtitle style={{color:"red"}}>No players have joined yet!</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        ):(
        <Row>
          <Col>
            <Card style={{background:  "#F3F3FF"}}>
              <Card.Body>
              <Card.Title> Playerlist </Card.Title>
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
              {this.state.leaderBoardUsers.map(leaderBoardUser => {
                return (
                    <PlayerContainer key={leaderBoardUser["participant"].participantID}>
                      <LeaderBoardPlayer leaderBoardUser={leaderBoardUser} />
                    </PlayerContainer>
                );
              })}
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
