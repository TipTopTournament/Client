import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { withRouter } from 'react-router-dom';
import { NoData } from "../../views/design/NoData";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


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
    const {tournamentCode} = this.props.match.params.tournamentCode;
    this.props.history.push(`/${tournamentCode}/${id}`);
  }

  async componentDidMount() {
    try {
      const {tournamentCode} = this.props.match.params;
      console.log("params", this.props.match.params);
      console.log("tournamentCode", {tournamentCode});
      const response = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
      console.log("response", response.data);
      // Get the returned users and update the state.
      this.setState({ users: response.data });
      console.log(response);

    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container>
        {!this.state.users ? (
            <NoData/>
        ):(
        <Row>
          <Col>


            <Form>
              <Form.Label> Playerlist </Form.Label>
              <Form.Group>
                {this.state.users.map(user => {
                  return (
                    <PlayerContainer key={user.participantID}>
                      <Player user={user} />
                    </PlayerContainer>
                  );
                })}
                <Button
                    type="button"
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                >
                  Leave tournament
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form onClick={()=> this.handleClick('leaderBoard')}>
              <Form.Label> Leaderboard </Form.Label>
              {this.state.users.map(user => {
                return (
                    <PlayerContainer key={user.participantID}>
                      <Player user={user} />
                    </PlayerContainer>
                );
              })}
            </Form>
            <Form onClick={()=> this.handleClick('bracket')}>
              <Form.Label> Bracket </Form.Label>
            </Form>

            </Col>
        </Row>
            )}
      </Container>
    );
  }
}

export default withRouter(Tournament);
