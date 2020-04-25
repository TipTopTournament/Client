import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { withRouter } from 'react-router-dom';
import { NoData } from "../../views/design/NoData";

const Container = styled(BaseContainer)`
  color: blue;
  text-align: center;
`;

const PlayerList = styled.ul`
  margin-right: 1000px;
  margin-bottom: 50px;
  list-style: none;
  padding-left: 0;
  border: 1px solid;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
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

class ManagerMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            tournaments: null,
        };
    }

    handleClick(tournamentCode){
        this.props.history.push(`/tournaments/${tournamentCode}/`);
    }

    async componentDidMount() {
        try {
            const {managerID} = this.props.match.params;
            const response = await api.get(`/managers/${managerID}/tournaments`);
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
                {!this.state.tournaments ? (
                    <NoData />

                ) : (
                    <div>
                        <PlayerList>
                            <h3>Tournamentlist</h3>
                            {this.state.tournaments.map(tournament => {
                                return (
                                    <PlayerContainer key={tournament.tournamentId}>
                                        <Player tournament={tournament} />
                                    </PlayerContainer>
                                );
                            })}
                            <ButtonPlayerList
                                width="100%"
                                onClick={() => {
                                    this.props.history.goBack();  localStorage.removeItem('token');
                                }}
                            >
                                Leave tournament
                            </ButtonPlayerList>
                        </PlayerList>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(ManagerMenu);
