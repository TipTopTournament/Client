import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const PlayerList = styled.ul`
  margin-right: 1000px;
  margin-bottom: 50px;
  list-style: none;
  padding-left: 0;
  border: 1px solid;
`;
const Bracket = styled.ul`
  margin-left: 400px
  margin-bottom: 50px;
  padding-left: 0;
  border: 1px solid;
`;
const Leaderboard = styled.ul`
  margin-left: 400px;
  margin-bottom: 50px;
  padding-left: 0;
  border: 1px solid;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;
const ButtonPlayerList = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
  display: block
  justifyContent: 'space-between'
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
    const {tournamentCode} = this.props.match.params;
    console.log('props', this.props);
    console.log('params', this.props.match.params);
    console.log('tournamentCode', {tournamentCode});
    this.props.history.push(`/${id}/${tournamentCode}`);
  }

  async componentDidMount() {
    try {
      const response = await api.get('/participants');
      console.log("response", response.data);
      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <PlayerList>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.participantID}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
              <ButtonPlayerList
                  width="100%"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
              >
                Leave tournament
              </ButtonPlayerList>
            </PlayerList>
            <Leaderboard onClick={()=> this.handleClick('leaderBoard')}>
              {this.state.users.map(user => {
                return (
                    <PlayerContainer key={user.participantID}>
                      <Player user={user} />
                    </PlayerContainer>
                );
              })}
            </Leaderboard>
            <Bracket onClick={()=> this.handleClick('bracket')}>
              DATA BRACKET
            </Bracket>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Tournament);
