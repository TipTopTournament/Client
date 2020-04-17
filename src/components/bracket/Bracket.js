import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const PlayerList = styled.ul`
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

class Bracket extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    
    async componentDidMount() {
        try {
            const {tournamentCode} = this.props.match.params;
            const response = await api.get(`/tournaments/${tournamentCode}/bracket`);
            console.log("response", response.data);

            this.setState({ users: response.data });

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
                        </PlayerList>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            Back to Tournament Overview
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Bracket);