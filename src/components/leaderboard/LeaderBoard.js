import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { NoData } from '../../views/design/NoData';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LeaderBoardPlayer from "../../views/LeaderBoardPlayer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            leaderBoardUsers: null,
        };
    }
    handleClick(playerID){
        const {tournamentCode} = this.props.match.params;
        this.props.history.push (`/${tournamentCode}/participants/${playerID}`)
    }

    async componentDidMount() {
        try {
            const {tournamentCode} = this.props.match.params;
            const response = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
            console.log("response", response.data);

            this.setState({ leaderBoardUsers: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container className= "custom-container2">
                <Row>
                    <Col>
                {!this.state.leaderBoardUsers ? (
                    <NoData />
                ) : (
                    <div>
                            {this.state.leaderBoardUsers.map(leaderBoardUser => {
                                return (
                                    <PlayerContainer key={leaderBoardUser["participant"].participantID} onClick={()=> this.handleClick(leaderBoardUser["participant"].participantID)}>
                                        <LeaderBoardPlayer leaderBoardUser={leaderBoardUser} />
                                    </PlayerContainer>
                                );
                            })}
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
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(LeaderBoard);